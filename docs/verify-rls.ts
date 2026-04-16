/**
 * RLS Verification Script
 * =======================
 * Run this script to verify that Row Level Security is working correctly.
 * The anon client should NOT be able to read registrations, payments,
 * receipts, admin_roles, or audit_log. It SHOULD be able to read
 * active pricing_tiers and retreat_config.
 *
 * Usage:
 *   npx tsx docs/verify-rls.ts
 *
 * Requires environment variables:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
  process.exit(1);
}

const supabase = createClient(url, anonKey);

interface TestResult {
  table: string;
  expected: "blocked" | "allowed";
  actual: "blocked" | "allowed";
  passed: boolean;
  rowCount: number | null;
  error: string | null;
}

async function testSelect(
  table: string,
  expected: "blocked" | "allowed"
): Promise<TestResult> {
  const { data, error } = await supabase.from(table).select("id").limit(5);

  const isBlocked = !!error || (data !== null && data.length === 0);
  const actual: "blocked" | "allowed" =
    error || (data && data.length === 0) ? "blocked" : "allowed";

  // For "allowed" tables with seed data, we expect rows back
  // For "blocked" tables, we expect an error or empty result
  let passed: boolean;
  if (expected === "blocked") {
    passed = isBlocked;
  } else {
    passed = !error && data !== null;
  }

  return {
    table,
    expected,
    actual,
    passed,
    rowCount: data ? data.length : null,
    error: error ? error.message : null,
  };
}

async function testInsert(table: string): Promise<TestResult> {
  const { error } = await supabase
    .from(table)
    .insert({ full_name: "RLS Test", email: "test@test.com" } as Record<string, unknown>);

  const isBlocked = !!error;

  return {
    table: `${table} (INSERT)`,
    expected: "blocked",
    actual: isBlocked ? "blocked" : "allowed",
    passed: isBlocked,
    rowCount: null,
    error: error ? error.message : null,
  };
}

async function main() {
  console.log("==============================================");
  console.log("  RLS Verification - Divine Connections");
  console.log("==============================================\n");

  const results: TestResult[] = [];

  // Tables that anon should NOT be able to read
  const blockedTables = [
    "registrations",
    "payments",
    "receipts",
    "admin_roles",
    "audit_log",
  ];

  // Tables that anon SHOULD be able to read (public data)
  const allowedTables = ["pricing_tiers", "retreat_config"];

  // Test blocked reads
  for (const table of blockedTables) {
    results.push(await testSelect(table, "blocked"));
  }

  // Test allowed reads
  for (const table of allowedTables) {
    results.push(await testSelect(table, "allowed"));
  }

  // Test that anon cannot insert into registrations
  results.push(await testInsert("registrations"));

  // Print results
  let allPassed = true;
  for (const result of results) {
    const icon = result.passed ? "PASS" : "FAIL";
    console.log(
      `[${icon}] ${result.table}: expected=${result.expected}, actual=${result.actual}` +
        (result.rowCount !== null ? `, rows=${result.rowCount}` : "") +
        (result.error ? `, error="${result.error}"` : "")
    );
    if (!result.passed) allPassed = false;
  }

  console.log("\n----------------------------------------------");
  if (allPassed) {
    console.log("All RLS checks PASSED.");
  } else {
    console.log("Some RLS checks FAILED. Review the results above.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});

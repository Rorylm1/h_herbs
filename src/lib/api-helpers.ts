/*
  SHARED API HELPERS — used by all route handlers

  These provide a consistent shape for API responses and a single
  place to handle unexpected errors. Every route handler wraps its
  logic in withErrorHandler() so uncaught exceptions always produce
  a tidy 500 JSON response instead of crashing.
*/

import { NextResponse } from "next/server";

export function successResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export async function withErrorHandler(
  fn: () => Promise<NextResponse>,
): Promise<NextResponse> {
  try {
    return await fn();
  } catch (error) {
    console.error("API error:", error);
    return errorResponse("Internal server error", 500);
  }
}

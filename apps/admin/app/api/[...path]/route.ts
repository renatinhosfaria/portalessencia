import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_INTERNAL_URL ?? "http://localhost:3001";

async function proxyRequest(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api/, "");
  const targetUrl = `${API_URL}${path}${url.search}`;

  const headers = new Headers();

  // Forward relevant headers
  const forwardHeaders = [
    "content-type",
    "accept",
    "accept-language",
    "x-request-id",
  ];

  forwardHeaders.forEach((header) => {
    const value = request.headers.get(header);
    if (value) {
      headers.set(header, value);
    }
  });

  // Forward cookies
  const cookies = request.headers.get("cookie");
  if (cookies) {
    headers.set("cookie", cookies);
  }

  // Prepare request body
  let body: string | undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    body = await request.text();
  }

  // Make the request to the API
  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
  });

  // Create response with forwarded headers
  const responseHeaders = new Headers();

  // Forward response headers
  const forwardResponseHeaders = ["content-type", "set-cookie"];
  forwardResponseHeaders.forEach((header) => {
    const value = response.headers.get(header);
    if (value) {
      responseHeaders.set(header, value);
    }
  });

  // Forward all Set-Cookie headers (there can be multiple)
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      responseHeaders.append(key, value);
    }
  });

  const responseBody = await response.text();

  return new NextResponse(responseBody, {
    status: response.status,
    headers: responseHeaders,
  });
}

export async function GET(request: NextRequest) {
  return proxyRequest(request);
}

export async function POST(request: NextRequest) {
  return proxyRequest(request);
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request);
}

export async function PATCH(request: NextRequest) {
  return proxyRequest(request);
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request);
}

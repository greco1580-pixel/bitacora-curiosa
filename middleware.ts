import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { storeConfig } from "@/lib/store-config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (storeConfig.mode === "preview") {
    if (pathname.startsWith("/carrito") || pathname.startsWith("/checkout")) {
      const url = request.nextUrl.clone();
      url.pathname = "/tienda";
      url.searchParams.set("notice", "preview-active");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/carrito/:path*", "/checkout/:path*"],
};
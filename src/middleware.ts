import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const { pathname } = url;

  const typeUser = cookies().get("sessionbiblioteca")?.value;

  console.log(typeUser);

  if (typeUser === "admin") {
    console.log("ADMIN", typeUser);
    return NextResponse.next();
  }

  console.log("ALUNO");

  url.pathname = "/inicio";

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};

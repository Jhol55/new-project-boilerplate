import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/services/supabase";
import { sessionService } from "@/services/session";
import { authService } from "@/services/auth";

export async function POST(request: NextRequest) {
  const requestData = await request.json();
  const encryptedData = {...requestData, password: authService.hashPassword(requestData.password)};

  const { error } = await supabase
    .from("users")
    .insert({ ...encryptedData });

  if (error) {
    return NextResponse.json({ success: false })
  }

  sessionService.createSession(requestData);

  return NextResponse.json({ success: true });
};
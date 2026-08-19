import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado." },
        { status: 400 }
      );
    }

    // Define onde salvar (pasta public/uploads)
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Cria a pasta se ela não existir
    await mkdir(uploadDir, { recursive: true });

    // Gera um nome único para o arquivo (evita conflitos)
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}${path.extname(file.name)}`;
    const filePath = path.join(uploadDir, filename);

    // Converte o arquivo para Buffer e salva no disco
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Retorna a URL relativa que será salva no banco
    const fileUrl = `/uploads/${filename}`;
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}

import { Material } from "@prisma/client";
import { prisma } from "prisma/config";

export async function GET(_request: Request) {
  try {
    // Busca todos os materiais do banco de dados, ordenado por order
    const materials = await prisma.material.findMany({
      orderBy: { order: "asc" },
    });

    return new Response(JSON.stringify(materials), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erro no servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request: Request) {
  try {
    const newMaterials = (await request.json()) as Material[];

    if (
      !newMaterials ||
      !Array.isArray(newMaterials) ||
      newMaterials.length === 0
    ) {
      return new Response(
        JSON.stringify({ error: "Nenhum material informado" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    for (let i = 0; i < newMaterials.length; i++) {
      const material = newMaterials[i];

      if (!material || !material.title || !material.href) {
        console.warn(
          `Material no índice ${i} ignorado por falta de dados obrigatórios.`
        );
        continue;
      }

      if (material.id) {
        // Update existing material
        await prisma.material.update({
          where: { id: material.id },
          data: {
            title: material.title,
            description: material.description ?? "",
            isNew: !!material.isNew,
            imageUrl: material.imageUrl,
            href: material.href,
            order: i,
          },
        });
      } else {
        await prisma.material.create({
          data: {
            title: material.title,
            description: material.description ?? "",
            isNew: material.isNew ?? false,
            imageUrl: material.imageUrl ?? "",
            href: material.href,
            order: i,
          },
        });
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erro no servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

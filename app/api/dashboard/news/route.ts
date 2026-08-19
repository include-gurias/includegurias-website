import { News } from "@prisma/client";
import { prisma } from "prisma/config";

export async function GET(_request: Request) {
  try {
    const news = await prisma.news.findMany({
      orderBy: { order: "asc" },
    });

    return new Response(JSON.stringify(news), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erro no servidor" }), {
      status: 500,
    });
  }
}

export async function PUT(request: Request) {
  try {
    const newNews = (await request.json()) as News[];

    if (!newNews || !Array.isArray(newNews) || newNews.length === 0) {
      return new Response(
        JSON.stringify({ error: "Nenhuma notícia informada" }),
        {
          status: 400,
        }
      );
    }

    for (let i = 0; i < newNews.length; i++) {
      const item = newNews[i];

      if (!item || !item.title) {
        console.warn(`Notícia no índice ${i} ignorada por estar incompleta.`);
        continue;
      }

      if (item.id) {
        // Update
        await prisma.news.update({
          where: { id: item.id },
          data: {
            title: item.title,
            text: item.text ?? "",
            imageUrl: item.imageUrl ?? "",
            date: item.date ?? new Date().toDateString(),
            href: item.href ?? "#",
            showInTimeline: item.showInTimeline ?? true,
            order: i,
          },
        });
      } else {
        await prisma.news.create({
          data: {
            title: item.title,
            text: item.text, // Se for obrigatório no schema, deve vir no JSON
            imageUrl: item.imageUrl,
            date: item.date || new Date().toISOString(), // Fallback para data atual
            href: item.href,
            showInTimeline: item.showInTimeline ?? true,
            order: i,
          },
        });
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erro no PUT News:", error);
    return new Response(
      JSON.stringify({ error: "Erro no servidor ao salvar notícias" }),
      {
        status: 500,
      }
    );
  }
}

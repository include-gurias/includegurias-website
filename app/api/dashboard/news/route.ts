import { News } from "@prisma/client";
import { prisma } from "prisma/config";

export async function GET(_request: Request) {
  try {
    // Busca todas as notícias do banco de dados, ordenado por order
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
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request: Request) {
  try {
    const newNews = (await request.json()) as News[];

    // Verifica se as notícias são válidas
    if (!newNews || newNews.length === 0) {
      return new Response(
        JSON.stringify({ error: "Nenhuma notícia informada" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Atualiza cada notícia com sua nova posição (order)
    for (let i = 0; i < newNews.length; i++) {
      const news = newNews[i];

      if (news.id) {
        // Update existing news
        await prisma.news.update({
          where: { id: news.id },
          data: {
            title: news.title,
            text: news.text,
            imageUrl: news.imageUrl,
            date: news.date,
            href: news.href,
            showInTimeline: news.showInTimeline,
            order: i,
          },
        });
      } else {
        // Create new news
        await prisma.news.create({
          data: {
            title: news.title,
            text: news.text,
            imageUrl: news.imageUrl,
            date: news.date,
            href: news.href,
            showInTimeline: news.showInTimeline,
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

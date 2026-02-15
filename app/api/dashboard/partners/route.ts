import { prisma } from "prisma/config";

/**
 * GET – lista parceiros ordenados
 */
export async function GET() {
  try {
    const partners = await prisma.partners.findMany({
      orderBy: { order: "asc" },
    });

    return new Response(JSON.stringify(partners), {
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

/**
 * PUT – atualiza apenas a ordem dos parceiros
 */
type PartnerOrderDTO = {
  id: number;
};

export async function PUT(request: Request) {
  try {
    const partners = (await request.json()) as PartnerOrderDTO[];

    if (!partners || partners.length === 0) {
      return new Response(
        JSON.stringify({ error: "Nenhum parceiro informado" }),
        { status: 400 }
      );
    }

    // Atualiza a ordem em transação (mais seguro)
    await prisma.$transaction(
      partners.map((partner, index) =>
        prisma.partners.updateMany({
          where: { id: partner.id },
          data: { order: index },
        })
      )
    );

    return new Response(JSON.stringify({ success: true }), {
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

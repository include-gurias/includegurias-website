import { TeamMember } from "@prisma/client";
import { prisma } from "prisma/config";

export async function GET(_request: Request) {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
    });

    return new Response(JSON.stringify(teamMembers), {
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
    const newTeamMembers = (await request.json()) as TeamMember[];

    if (
      !newTeamMembers ||
      !Array.isArray(newTeamMembers) ||
      newTeamMembers.length === 0
    ) {
      return new Response(
        JSON.stringify({ error: "Nenhum membro informado" }),
        { status: 400 }
      );
    }

    for (let i = 0; i < newTeamMembers.length; i++) {
      const member = newTeamMembers[i];

      if (!member || !member.name) {
        console.warn(`Membro no índice ${i} ignorado por dados insuficientes.`);
        continue;
      }

      if (member.id) {
        // Update
        await prisma.teamMember.update({
          where: { id: member.id },
          data: {
            name: member.name,
            job: member.job ?? "",
            imageUrl: member.imageUrl ?? "",
            href: member.href ?? "",
            order: i,
          },
        });
      } else {
        await prisma.teamMember.create({
          data: {
            name: member.name,
            job: member.job,
            imageUrl: member.imageUrl,
            href: member.href,
            order: i,
          },
        });
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erro no PUT TeamMember:", error);
    return new Response(JSON.stringify({ error: "Erro ao salvar equipe" }), {
      status: 500,
    });
  }
}

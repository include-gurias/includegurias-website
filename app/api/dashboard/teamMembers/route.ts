import { TeamMember } from "@prisma/client";
import { prisma } from "prisma/config";

export async function GET(_request: Request) {
  try {
    // Busca todos os membros da equipe do banco de dados, ordenado por order
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
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request: Request) {
  try {
    const newTeamMembers = (await request.json()) as TeamMember[];

    // Verifica se os membros da equipe são válidos
    if (!newTeamMembers || newTeamMembers.length === 0) {
      return new Response(
        JSON.stringify({ error: "Nenhum membro da equipe informado" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Atualiza cada membro da equipe com sua nova posição (order)
    for (let i = 0; i < newTeamMembers.length; i++) {
      const member = newTeamMembers[i];

      if (member.id) {
        // Update existing member
        await prisma.teamMember.update({
          where: { id: member.id },
          data: {
            name: member.name,
            job: member.job,
            imageUrl: member.imageUrl,
            href: member.href,
            order: i,
          },
        });
      } else {
        // Create new member
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

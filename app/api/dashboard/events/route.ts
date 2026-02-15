import { EventsActivities, Prisma } from "@prisma/client";
import { prisma } from "prisma/config";

export async function GET(_request: Request) {
    try {
        const activities = await prisma.eventsActivities.findMany({}); 

        return new Response(JSON.stringify(activities), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Erro no servidor ao buscar atividades" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function PUT(request: Request) {
    try {
        const newActivities: EventsActivities[] = await request.json(); 

        const activitiesToCreate = newActivities.map(activity => ({
            ...activity,
            details: activity.details as Prisma.JsonValue, 
            id: activity.id === undefined ? undefined : activity.id,
        }));
        
        await prisma.eventsActivities.deleteMany({});
        
        await prisma.eventsActivities.createMany({
            data: activitiesToCreate as Prisma.EventsActivitiesCreateManyInput[], 
        });

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
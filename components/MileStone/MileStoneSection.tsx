"use client";
import { useEffect } from "react";
import { Box, Grid, Card, Text, Heading } from "@chakra-ui/react";
import { useNewsStore } from "app/states"; // Usar o mesmo store
import News from "types/data/news";
import { SeeMoreArrow } from "components";

const MilestoneCard = ({ date, title, text, href }: News) => {
    return (
        <Card p={5} shadow="md" rounded="lg">
            <Text fontSize="xs" color="gray.500" mb={1}>{new Date(date).toLocaleDateString()}</Text>
            <Heading size="md" mb={2}>{title}</Heading>
            <Text fontSize="sm" color="gray.600" mb={3} noOfLines={3}>{text}</Text>
            {href && <SeeMoreArrow text="Saiba mais" href={href} />}
        </Card>
    );
}

const MilestonesSection = () => {
    const { getNews, news } = useNewsStore();

    useEffect(() => { 
        getNews();
    }, [getNews]);

    const TIMELINE_DATA = news
        .filter((item) => item.showInTimeline === true)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (TIMELINE_DATA.length === 0) return null;

    return (
        <Grid 
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            gap={6}
            mt={10}
            mb={10}
        >
            {TIMELINE_DATA.map((milestone, index) => (
                <MilestoneCard key={index} {...milestone} />
            ))}
        </Grid>
    );
};

export default MilestonesSection;
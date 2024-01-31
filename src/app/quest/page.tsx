"use client"
import Link from "next/link";
import AddQuest from "~/components/ui/addQuest";
import { api } from "~/trpc/react";
import {
    Card,
    CardDescription,
    CardTitle,
} from "~/components/ui/card"

interface Quest {
    id: number,
    name: string,
    description: string|null;
}

const Quest = () => {
    const getQuests = api.project.getProjects.useQuery();
    const quests = getQuests.data ?? [];

    return (
        <>
            <AddQuest />
            <div className="flex gap-3 flex-col mt-3">
                <p>Existing Quests:</p>
                {quests.map((quest: Quest) => (
                    <Link href={`/quest/${quest.id}`} key={quest.id}>
                        <Card className="p-4 w-1/2">
                            <CardTitle>{quest.name}</CardTitle>
                            <div>
                            <CardDescription>{quest.description}</CardDescription>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Quest;

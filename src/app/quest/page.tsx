"use client"
import Link from "next/link";
import AddQuest from "~/components/ui/addQuest";
import { api } from "~/trpc/react";
import {
    Card,
    CardDescription,
    CardTitle,
} from "~/components/ui/card"
import type { Quest } from "../exports/interfaces";

const Quest = () => {
    const getQuests = api.project.getProjects.useQuery();
    const quests = getQuests.data ?? [];

    return (
        <>
            <div className="flex">
                <div className="flex gap-3 flex-col w-1/2 p-2">
                    <p>Existing Quests:</p>
                    {quests.map((quest: Quest) => (
                        <Link href={`/quest/${quest.id}`} key={quest.id}>
                            <Card className="p-4">
                                <CardTitle>{quest.name}</CardTitle>
                                <div>
                                    <CardDescription>{quest.description}</CardDescription>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
                <div className="w-1/2 p-2 flex flex-col gap-3">
                    <AddQuest />
                </div>
            </div>
        </>
    );
};

export default Quest;

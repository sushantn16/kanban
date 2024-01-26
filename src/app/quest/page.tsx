"use client"
import Link from "next/link";
import AddQuest from "~/components/ui/addQuest";
import { api } from "~/trpc/react";

const Quest = () => {
    const getQuests = api.project.getProjects.useQuery();
    const quests = getQuests.data ?? [];

    return (
        <>
            <AddQuest />
            <div className="mt-3">
                <p>Existing Quests:</p>
                {quests.map(quest => (
                    <div key={quest.id}>
                        <Link href={`/quest/${quest.id}`}>{quest.name}</Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Quest;

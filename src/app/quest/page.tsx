"use client"
import Link from "next/link";
import AddQuest from "~/components/addQuest";
import { api } from "~/trpc/react";
import {
    Card,
    CardDescription,
    CardTitle,
} from "~/components/ui/card"
import type { Quest } from "../exports/interfaces";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

const Quest = () => {
    const getQuests = api.project.getProjects.useQuery();
    const quests = getQuests.data ?? [];

    const addQuest = api.project.createProject.useMutation({
        onSuccess: async () => {
            toast.success("A new Quest has been created");
            await getQuests.refetch();
        },
        onError: () => {
            toast.error("Some problem creating a quest");
        }
    });

    const removeQuest = api.project.deleteProject.useMutation({
        onSuccess: async () => {
            toast.success("Quest has been deleted");
            await getQuests.refetch();
        },
        onError: () => {
            toast.error("Some problem deleting a quest");
        }
    });

    const onDeleteButtonClick = (e:React.MouseEvent<HTMLButtonElement>,id: number) => {
        e.preventDefault()
        removeQuest.mutate({
            projectId: id
        });
    }

    return (
        <>
            <div className="flex">
                <div className="flex gap-3 flex-col w-1/2 p-2">
                    <p>Existing Quests:</p>
                    {quests.map((quest: Quest) => (
                        <Link href={`/quest/${quest.id}`} key={quest.id}>
                            <Card className="p-4 flex justify-between">
                                <div>
                                <CardTitle>{quest.name}</CardTitle>
                                <CardDescription>{quest.description}</CardDescription>
                                </div>
                                <Button variant='outline' onClick={(e) => onDeleteButtonClick(e,quest.id)}>
                                    <TrashIcon />
                                </Button>
                            </Card>
                        </Link>
                    ))}
                </div>
                <div className="w-1/2 p-2 flex flex-col gap-3">
                    <AddQuest addQuest={addQuest} />
                </div>
            </div>
        </>
    );
};

export default Quest;

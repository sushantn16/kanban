"use client"
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

const AddQuest = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const quest = api.project.createProject.useMutation({
        onSuccess: async () => {
            toast.success("A new Quest has been created");
            setName("");
            setDescription("");
        },
        onError: () => {
            toast.error("Some problem creating a quest");
        }
    });

    const createQuest = () => {
        quest.mutate({
            projectName: name,
            description: description,
        });
    };

    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault();
        createQuest();
    };

    return (
        <>
            <p>Create a new Quest</p>
            <form onSubmit={handleSubmit} className="flex flex-col w-1/2 gap-3">
                <Input
                    placeholder="Quest name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    placeholder="Description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <div>
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </>
    );
};

export default AddQuest;

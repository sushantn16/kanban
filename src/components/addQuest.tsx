"use client"
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

const AddQuest = (props:{
    addQuest: ReturnType<typeof api.project.createProject.useMutation>
}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    const createQuest = () => {
        props.addQuest.mutate({
            projectName: name,
            description: description,
        });
        setName("");
        setDescription("");
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

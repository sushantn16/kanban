"use client"
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";

const AddQuest = () =>{
    const [name, setName] = useState('');
    const quest = api.project.createProject.useMutation({
        onSuccess: async () => {
            toast.success("A new Quest has been created")
            setName("");
        },
        onError: () => {
            toast.error("Some problem creating a quest")
        }
    })
    const createQuest = () => {
        quest.mutate({
            projectName:name
        });
    }

    return (
        <>
            <Label className="text-l" htmlFor="name">Create a new Quest</Label>
            <div className="flex w-1/2 gap-2">
                <Input placeholder="Quest name" id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                <Button onClick={createQuest}>Create new Quest</Button>
            </div>
        </>
    )
}
export default AddQuest;
import AutoPost from './auto';
import ManualPost from './manual';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function Post() {
  return (
    <div className='mt-20'>
        <h1 className='font-light text-2xl border-b mb-2 pb-2 pl-4'> New Post </h1>
        <Tabs defaultValue="auto" className="w-full">
            <TabsList className="grid w-full grid-cols-2 gap-6">
                <TabsTrigger value="auto" className=" rounded">Auto</TabsTrigger>
                <TabsTrigger value="manual" className=" rounded">Manual</TabsTrigger>
            </TabsList>
            <TabsContent value="auto">
                <AutoPost />
            </TabsContent>
            <TabsContent value="manual">
                <ManualPost />
            </TabsContent>
        </Tabs>
    </div>
  )
}

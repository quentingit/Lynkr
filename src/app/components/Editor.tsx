"use client";
import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Label } from "../../components/ui/label";
import Preview from "./Preview";
import {
  Smartphone,
  Monitor,
  Upload,
  Palette,
  GripVertical,
} from "lucide-react";
import { useToast } from "../../components/ui/use-toast";
import { Switch } from "../../components/ui/switch";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { TemplateType } from "@/types/template";
import { templates } from "@/utils/templates";

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  type:
    | "custom"
    | "facebook"
    | "instagram"
    | "twitter"
    | "youtube"
    | "linkedin"
    | "github";
  order: number;
  isIframe?: boolean;
}

export interface Profile {
  name: string;
  image: string;
  backgroundColor: string;
  backgroundImage: string | null;
  backgroundVideo: string | null;
  showName: boolean;
  showImage: boolean;
  font: string;
  template: TemplateType;
}

const Editor = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [profile, setProfile] = useState<Profile>({
    name: "Votre Nom",
    image: "/placeholder.svg",
    backgroundColor: "#9b87f5",
    backgroundImage: null,
    backgroundVideo: null,
    showName: true,
    showImage: true,
    font: "sans-serif",
    template: "classic",
  });
  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    type: "custom" as const,
    isIframe: false,
  });
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">(
    "desktop"
  );
  const [isDragEnabled, setIsDragEnabled] = useState(false);
  const { toast } = useToast();

  const addLink = () => {
    if (!newLink.title || !newLink.url) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    setLinks([
      ...links,
      {
        ...newLink,
        id: Date.now().toString(),
        order: links.length,
      },
    ]);
    setNewLink({ title: "", url: "", type: "custom", isIframe: false });
  };

  const addSocialLink = (
    type:
      | "facebook"
      | "instagram"
      | "twitter"
      | "youtube"
      | "linkedin"
      | "github"
  ) => {
    const socialData = {
      facebook: { title: "Facebook", url: "https://facebook.com/" },
      instagram: { title: "Instagram", url: "https://instagram.com/" },
      twitter: { title: "Twitter", url: "https://twitter.com/" },
      youtube: { title: "YouTube", url: "https://youtube.com/" },
      linkedin: { title: "LinkedIn", url: "https://linkedin.com/in/" },
      github: { title: "GitHub", url: "https://github.com/" },
    };

    setLinks([
      ...links,
      {
        id: Date.now().toString(),
        title: socialData[type].title,
        url: socialData[type].url,
        type: type,
        order: links.length,
        isIframe: false,
      },
    ]);
  };

  const removeLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "background"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "profile") {
          setProfile({ ...profile, image: reader.result as string });
        } else {
          setProfile({
            ...profile,
            backgroundImage: reader.result as string,
            backgroundVideo: null,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          backgroundVideo: reader.result as string,
          backgroundImage: null,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    setLinks(reorderedItems);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
      <Card className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Éditeur Linktree</h2>

        <Tabs defaultValue="links" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="links">Liens</TabsTrigger>
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
            {/* <TabsTrigger value="social">Réseaux Sociaux</TabsTrigger> */}
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="links">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="links-editor">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label>Titre du lien</Label>
                      <Input
                        value={newLink.title}
                        onChange={(e) =>
                          setNewLink({ ...newLink, title: e.target.value })
                        }
                        placeholder="Ex: Mon Portfolio"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>URL</Label>
                      <Input
                        value={newLink.url}
                        onChange={(e) =>
                          setNewLink({ ...newLink, url: e.target.value })
                        }
                        placeholder="https://..."
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="iframe-mode"
                        checked={newLink.isIframe}
                        onCheckedChange={(checked) =>
                          setNewLink({ ...newLink, isIframe: checked })
                        }
                      />
                      <Label htmlFor="iframe-mode">Afficher comme iframe</Label>
                    </div>

                    <Button onClick={addLink} className="w-full">
                      Ajouter un lien
                    </Button>

                    <div className="flex items-center space-x-2 mt-4">
                      <Switch
                        id="drag-mode"
                        checked={isDragEnabled}
                        onCheckedChange={setIsDragEnabled}
                      />
                      <Label htmlFor="drag-mode">
                        Activer le mode glisser-déposer
                      </Label>
                    </div>

                    <div className="space-y-2 mt-4">
                      {links
                        .sort((a, b) => a.order - b.order)
                        .map((link, index) => (
                          <Draggable
                            key={link.id}
                            draggableId={link.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="flex items-center gap-2"
                              >
                                <GripVertical className="cursor-move text-gray-400" />
                                <Input disabled value={link.title} />
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeLink(link.id)}
                                >
                                  ×
                                </Button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </TabsContent>

          <TabsContent value="appearance">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nom</Label>
                <Input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="show-name"
                  checked={profile.showName}
                  onCheckedChange={(checked) =>
                    setProfile({ ...profile, showName: checked })
                  }
                />
                <Label htmlFor="show-name">Afficher le nom</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="show-image"
                  checked={profile.showImage}
                  onCheckedChange={(checked) =>
                    setProfile({ ...profile, showImage: checked })
                  }
                />
                <Label htmlFor="show-image">
                  Afficher l&apos;image de profil
                </Label>
              </div>

              <div className="space-y-2">
                <Label>Image de profil</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "profile")}
                />
              </div>

              <div className="space-y-2">
                <Label>Image de fond</Label>
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "background")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Vidéo de fond</Label>
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Couleur de fond (si pas d&apos;image/vidéo)</Label>
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  <Input
                    type="color"
                    value={profile.backgroundColor}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        backgroundColor: e.target.value,
                      })
                    }
                    className="w-full h-10"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => addSocialLink("facebook")}
                variant="outline"
              >
                Facebook
              </Button>
              <Button
                onClick={() => addSocialLink("instagram")}
                variant="outline"
              >
                Instagram
              </Button>
              <Button
                onClick={() => addSocialLink("twitter")}
                variant="outline"
              >
                Twitter
              </Button>
              <Button
                onClick={() => addSocialLink("youtube")}
                variant="outline"
              >
                YouTube
              </Button>
              <Button
                onClick={() => addSocialLink("linkedin")}
                variant="outline"
              >
                LinkedIn
              </Button>
              <Button onClick={() => addSocialLink("github")} variant="outline">
                GitHub
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="grid grid-cols-2 gap-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`p-4 cursor-pointer hover:shadow-lg transition-shadow ${
                    profile.template === template.id
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                  onClick={() =>
                    setProfile({ ...profile, template: template.id })
                  }
                >
                  <h3 className="font-bold mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600">
                    {template.description}
                  </p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Aperçu</h2>
          <div className="flex gap-2">
            <Button
              variant={previewMode === "desktop" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewMode("desktop")}
            >
              <Monitor className="w-4 h-4 mr-2" />
              Desktop
            </Button>
            <Button
              variant={previewMode === "mobile" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewMode("mobile")}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile
            </Button>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Preview
            links={links}
            profile={profile}
            mode={previewMode}
            isDragEnabled={isDragEnabled}
            onRemoveLink={removeLink}
          />
        </DragDropContext>
      </Card>
    </div>
  );
};

export default Editor;

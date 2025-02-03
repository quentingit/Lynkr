import React from "react";
import { Card } from "../../components/ui/card";
import { LinkItem, Profile } from "./Editor";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Github,
  X,
} from "lucide-react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { templates } from "@/utils/templates";

interface PreviewProps {
  links: LinkItem[];
  profile: Profile;
  mode: "mobile" | "desktop";
  isDragEnabled: boolean;
  onRemoveLink: (id: string) => void;
}

const Preview = ({
  links,
  profile,
  mode,
  isDragEnabled,
  onRemoveLink,
}: PreviewProps) => {
  const template =
    templates.find((t) => t.id === profile.template) || templates[0];

  const containerStyle = {
    background: profile.backgroundVideo
      ? "none"
      : profile.backgroundImage
      ? `url(${profile.backgroundImage}) center/cover no-repeat`
      : profile.backgroundColor,
    fontFamily: profile.font,
  };

  const getSocialIcon = (type: LinkItem["type"]) => {
    switch (type) {
      case "facebook":
        return <Facebook className="w-5 h-5" />;
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "twitter":
        return <Twitter className="w-5 h-5" />;
      case "youtube":
        return <Youtube className="w-5 h-5" />;
      case "linkedin":
        return <Linkedin className="w-5 h-5" />;
      case "github":
        return <Github className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`preview-container rounded-lg overflow-hidden relative ${
        mode === "mobile" ? "w-[375px] mx-auto" : "w-full"
      }`}
      style={containerStyle}
    >
      {profile.backgroundVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={profile.backgroundVideo} type="video/mp4" />
        </video>
      )}
      <div className="min-h-[600px] p-8 backdrop-blur-sm backdrop-brightness-[0.9] relative z-10">
        <div className="flex flex-col items-center gap-4 mb-8">
          {profile.showImage && (
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.image} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          {profile.showName && (
            <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
          )}
        </div>

        <Droppable droppableId="links" isDropDisabled={!isDragEnabled}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={template.layout.containerStyle}
            >
              <div className={template.layout.spacing}>
                {links
                  .sort((a, b) => a.order - b.order)
                  .map((link, index) => (
                    <Draggable
                      key={link.id}
                      draggableId={link.id}
                      index={index}
                      isDragDisabled={!isDragEnabled}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {link.isIframe ? (
                            <div className="relative aspect-video w-full mb-4">
                              <iframe
                                src={link.url}
                                className="absolute inset-0 w-full h-full rounded-lg"
                                title={link.title}
                                allowFullScreen
                              />
                            </div>
                          ) : (
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-item block group"
                              onClick={(e) => {
                                if (isDragEnabled) {
                                  e.preventDefault();
                                }
                              }}
                            >
                              <Card
                                className={`${template.layout.linkStyle} relative`}
                              >
                                <div className="flex items-center justify-center gap-2">
                                  {getSocialIcon(link.type)}
                                  <span>{link.title}</span>
                                </div>
                                {isDragEnabled && (
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      onRemoveLink(link.id);
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="w-4 h-4 text-red-500" />
                                  </button>
                                )}
                              </Card>
                            </a>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Preview;

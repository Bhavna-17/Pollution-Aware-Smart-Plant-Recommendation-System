import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, MapPin, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommunityTipProps {
  author: {
    name: string;
    avatar?: string;
    location?: string;
  };
  content: string;
  plant?: string;
  likes: number;
  comments: number;
  isVerified?: boolean;
  tags?: string[];
  createdAt: string;
  className?: string;
}

const CommunityTip = ({
  author,
  content,
  plant,
  likes,
  comments,
  isVerified = false,
  tags = [],
  createdAt,
  className,
}: CommunityTipProps) => {
  return (
    <Card variant="elevated" className={cn("group", className)}>
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="w-10 h-10 border-2 border-sage/20">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="bg-sage/10 text-sage font-medium">
              {author.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground truncate">
                {author.name}
              </span>
              {isVerified && (
                <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
              )}
            </div>
            {author.location && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{author.location}</span>
              </div>
            )}
          </div>
          
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {createdAt}
          </span>
        </div>

        {/* Plant reference */}
        {plant && (
          <Badge variant="secondary" className="mb-3 bg-mint-light/50 text-sage border-0">
            🌱 {plant}
          </Badge>
        )}

        {/* Content */}
        <p className="text-foreground leading-relaxed mb-4">
          {content}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted-foreground hover:text-sage cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-3 border-t border-border/50">
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors group/btn">
            <Heart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            <span>{likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-sage transition-colors group/btn">
            <MessageCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            <span>{comments}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityTip;

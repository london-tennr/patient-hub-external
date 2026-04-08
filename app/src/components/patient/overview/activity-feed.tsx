'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@tennr/lasso/card';
import { Avatar, AvatarFallback } from '@tennr/lasso/avatar';

interface Activity {
  id: string;
  type: 'order_created' | 'order_update' | 'patient_created' | 'patient_update';
  description: string;
  author: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent activity</p>
        ) : (
          <div className="space-y-4">
            {activities.map(activity => (
              <div key={activity.id} className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{activity.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.author} · {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

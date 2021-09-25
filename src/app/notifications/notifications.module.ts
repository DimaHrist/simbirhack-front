import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NotificationItemComponent } from './components/notification-item/notification-item.component';



@NgModule({
  declarations: [NotificationsComponent, NotificationItemComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    SharedModule,
  ]
})
export class NotificationsModule { }

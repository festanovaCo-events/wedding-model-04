import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { Calendar03Icon } from '@hugeicons/core-free-icons';
import { MODEL_04_INFO } from '../../constants/m04-info';
import { ConfirmationModalHostComponent } from '../../shared/components/confirmations/confirmation-modal-host.component';
import { ConfirmationStatusComponent } from '../../shared/components/confirmations/confirmation-status/confirmation-status.component';
import { DeclinedStatusComponent } from '../../shared/components/confirmations/declined-status/declined-status.component';
import { ErrorStatusComponent } from '../../shared/components/confirmations/error-status/error-status.component';
import { InvitationStateService } from '../../shared/services/invitation-state.service';
import { ModalFlowService } from '../../shared/services/modal-flow.service';
import {
  hasResponded,
  invitationStatusView,
} from '../../shared/interfaces/invitation.interface';
import type { RsvpView } from '../../shared/interfaces/rsvp-view.interface';

@Component({
  selector: 'app-m04-rsvp',
  standalone: true,
  imports: [
    CommonModule,
    HugeiconsIconComponent,
    ConfirmationModalHostComponent,
    ConfirmationStatusComponent,
    DeclinedStatusComponent,
    ErrorStatusComponent,
  ],
  templateUrl: './m04-rsvp.component.html',
})
export class M04RsvpComponent implements OnInit {
  readonly info = MODEL_04_INFO.rsvp;
  readonly CalendarIcon = Calendar03Icon;
  readonly view$: Observable<RsvpView>;

  isConfirmationModalVisible = false;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private invitationStateService: InvitationStateService,
    private modalFlowService: ModalFlowService,
  ) {
    this.view$ = combineLatest([
      this.invitationStateService.invitationData$,
      this.invitationStateService.error$,
    ]).pipe(
      map(([invitationData, error]): RsvpView => {
        const status = invitationStatusView(invitationData?.data.invitation.status);
        return {
          invitationData,
          error,
          isConfirmed: status.isAccepted,
          isDeclined: status.isDeclined,
        };
      }),
    );
  }

  ngOnInit(): void {
    this.invitationStateService.error$
      .pipe(
        filter((error): error is string => !!error),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.isConfirmationModalVisible = false;
      });

    this.modalFlowService.openConfirmationModal$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.openConfirmation());
  }

  openConfirmation(): void {
    const status = this.invitationStateService.getInvitationData()?.data.invitation.status;
    if (hasResponded(status) || this.invitationStateService.getError()) {
      return;
    }
    this.isConfirmationModalVisible = true;
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalVisible = false;
  }
}

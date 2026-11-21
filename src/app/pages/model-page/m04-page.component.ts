import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { M04HeroComponent } from '../../components/hero/m04-hero.component';
import { M04EventsComponent } from '../../components/events/m04-events.component';
import { M04GiftsComponent } from '../../components/gifts/m04-gifts.component';
import { M04RsvpComponent } from '../../components/rsvp/m04-rsvp.component';
import { M04ClosingComponent } from '../../components/closing/m04-closing.component';
import { ModalComponent } from '../../shared/components/common/modal/modal.component';
import { ConfirmationGuideStore } from '../../shared/services/confirmation-guide.store';
import { ModalFlowService } from '../../shared/services/modal-flow.service';
import { InvitationStateService } from '../../shared/services/invitation-state.service';
import {
  InvitationInfoResponse,
  InvitationStatus,
  hasResponded,
} from '../../shared/interfaces/invitation.interface';
import { shouldShowExpiredInvitationPage } from '../../shared/utils/confirmation-deadline';
import { MODEL_04_INFO } from '../../constants/m04-info';

@Component({
  selector: 'app-m04-page',
  standalone: true,
  imports: [
    CommonModule,
    M04HeroComponent,
    M04EventsComponent,
    M04GiftsComponent,
    M04RsvpComponent,
    M04ClosingComponent,
    ModalComponent,
  ],
  templateUrl: './m04-page.component.html',
})
export class M04PageComponent implements OnInit {
  readonly guide = MODEL_04_INFO.confirmationGuide;
  showConfirmationGuide = false;

  private readonly destroyRef = inject(DestroyRef);
  private welcomeAccepted = false;
  private invitationLoadPending = false;
  private isPreviewMode = false;

  constructor(
    private modalFlowService: ModalFlowService,
    private invitationStateService: InvitationStateService,
    private confirmationGuideStore: ConfirmationGuideStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          this.isPreviewMode = params['preview'] === '1';
          const invitationToken = typeof params['token'] === 'string' ? params['token'] : undefined;

          if (!invitationToken) {
            this.invitationLoadPending = false;
            if (this.welcomeAccepted) {
              this.tryShowConfirmationGuide();
            }
            return EMPTY;
          }

          this.invitationLoadPending = true;
          return this.invitationStateService.load(invitationToken).pipe(
            catchError(() => {
              this.invitationLoadPending = false;
              if (this.welcomeAccepted) {
                this.tryShowConfirmationGuide();
              }
              return EMPTY;
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    this.modalFlowService.welcomeModalAccepted$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.welcomeAccepted = true;
        this.tryShowConfirmationGuide();
      });

    this.invitationStateService.invitationData$
      .pipe(
        filter((data): data is InvitationInfoResponse => data !== null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((data) => this.handleInvitation(data.data.invitation.status));
  }

  openConfirmation(): void {
    this.closeGuide();
    this.modalFlowService.requestOpenConfirmationModal();
  }

  closeGuide(): void {
    this.dismissConfirmationGuide();
  }

  private handleInvitation(status: InvitationStatus): void {
    this.invitationLoadPending = false;

    if (!this.isPreviewMode && shouldShowExpiredInvitationPage(status)) {
      void this.router.navigate(['/expired'], {
        queryParamsHandling: 'preserve',
        replaceUrl: true,
      });
      return;
    }

    if (hasResponded(status)) {
      this.dismissConfirmationGuide();
      return;
    }

    if (this.welcomeAccepted) {
      this.tryShowConfirmationGuide();
    }
  }

  private shouldShowConfirmationGuide(): boolean {
    if (this.confirmationGuideStore.hasBeenDismissed()) {
      return false;
    }

    const status = this.invitationStateService.getInvitationData()?.data.invitation.status;
    if (hasResponded(status)) {
      return false;
    }

    return !this.invitationLoadPending;
  }

  private tryShowConfirmationGuide(): void {
    if (this.shouldShowConfirmationGuide()) {
      this.showConfirmationGuide = true;
    }
  }

  private dismissConfirmationGuide(): void {
    this.showConfirmationGuide = false;
    this.confirmationGuideStore.markDismissed();
  }
}

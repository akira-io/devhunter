<?php

declare(strict_types=1);

namespace App\Providers\Filament;

use Filament\Actions\Action;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\DatePicker;
use Filament\Infolists\Components\TextEntry;
use Filament\Tables\Actions\AttachAction;
use Filament\Tables\Actions\DetachAction;
use Filament\Tables\Table;
use Illuminate\Support\ServiceProvider;

// @codeCoverageIgnoreStart
final class ConfigureUsingServiceProvider extends ServiceProvider
{
    /**
     * Register new filament components configuration
     */
    public function boot(): void
    {
        $this->configureTable();
        $this->configureInfoListTextEntry();
        $this->configureActions();
        $this->configureFields();
    }

    /**
     * Configure the table component
     */
    private function configureTable(): void
    {
        Table::configureUsing(function (Table $table): void {
            $table
                ->striped()
                ->defaultPaginationPageOption(5)
                ->defaultSort('id', 'desc')
                ->paginationPageOptions([5, 10, 25, 50, 100])
                ->emptyStateHeading('Nenhum registo encontrado');
        });
        $this->configureTableActions();
    }

    /**
     * Configure the info list text entry component
     */
    private function configureInfoListTextEntry(): void
    {
        TextEntry::configureUsing(function (TextEntry $textEntry): void {
            $textEntry
                ->badge()
                ->color('info')
                ->hidden(fn (?string $state): bool => $state === null);
        });
    }

    /**
     * Configure the actions component
     */
    private function configureActions(): void
    {
        $this->configureAction();
        $this->configureDeleteAction();
        $this->configureViewAction();
        $this->configureCreateAction();
        $this->configureEditAction();
    }

    /**
     * Configure the table actions component
     */
    private function configureTableActions(): void
    {
        $this->configureCreateTableAction();
        $this->configureAttachAction();
        $this->configureEditTableAction();
        $this->configureDeleteTableAction();
        $this->configureViewTableAction();
        $this->configureDetachTableAction();
    }

    /**
     * Configure the fields component
     */
    private function configureAction(): void
    {
        Action::configureUsing(function (Action $action): void {
            $action
                ->closeModalByClickingAway(false);
        });
    }

    /**
     * Configure the delete action component
     */
    private function configureDeleteAction(): void
    {
        DeleteAction::configureUsing(function (DeleteAction $deleteAction): void {
            $deleteAction
                ->icon('heroicon-o-trash');
        });
    }

    /**
     * Configure the view action component
     */
    private function configureViewAction(): void
    {
        ViewAction::configureUsing(function (ViewAction $viewAction): void {
            $viewAction
                ->icon('heroicon-o-eye');
        });
    }

    /**
     * Configure the create action component
     */
    private function configureCreateAction(): void
    {
        CreateAction::configureUsing(function (CreateAction $createAction): void {
            $createAction
                ->icon('heroicon-o-plus');
        });
    }

    /**
     * Configure the edit action component
     */
    private function configureEditAction(): void
    {
        EditAction::configureUsing(function (EditAction $action): void {
            $action
                ->icon('heroicon-o-pencil-square');
        });
    }

    /**
     * Configure the table actions component
     */
    private function configureCreateTableAction(): void
    {

        \Filament\Tables\Actions\CreateAction::configureUsing(function (\Filament\Tables\Actions\CreateAction $createAction): void {
            $createAction
                ->icon('heroicon-o-plus');
        });
    }

    /**
     * Configure the attach action component
     */
    private function configureAttachAction(): void
    {
        AttachAction::configureUsing(function (AttachAction $attachAction): void {
            $attachAction
                ->button()
                ->icon('heroicon-o-link');
        });
    }

    /**
     * Configure the edit table action component
     */
    private function configureEditTableAction(): void
    {
        \Filament\Tables\Actions\EditAction::configureUsing(function (\Filament\Tables\Actions\EditAction $action): void {
            $action
                ->iconButton()
                ->closeModalByClickingAway(false);
        });
    }

    /**
     * Configure the delete table action component
     */
    private function configureDeleteTableAction(): void
    {
        \Filament\Tables\Actions\DeleteAction::configureUsing(function (\Filament\Tables\Actions\DeleteAction $action): void {
            $action
                ->iconButton();
        });
    }

    /**
     * Configure the view table action component
     */
    private function configureViewTableAction(): void
    {
        \Filament\Tables\Actions\ViewAction::class::configureUsing(function (\Filament\Tables\Actions\ViewAction $action): void {
            $action
                ->iconButton();
        });
    }

    /**
     * Configure the detach table action component
     */
    private function configureDetachTableAction(): void
    {
        DetachAction::configureUsing(function (DetachAction $detachAction): void {
            $detachAction
                ->iconButton();
        });
    }

    /**
     * Configure the date picker component
     */
    private function configureFields(): void
    {
        $this->configureDatePicker();
    }

    /**
     * Configure the date picker component
     */
    private function configureDatePicker(): void
    {
        DatePicker::configureUsing(function (DatePicker $datePicker): void {
            $datePicker
                ->prefixIcon('heroicon-o-calendar')
                ->closeOnDateSelection()
                ->native(false);
        });
    }
}
// @codeCoverageIgnoreEnd

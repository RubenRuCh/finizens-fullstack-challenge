import { Command } from '../../../../../src/Contexts/Shared/Domain/CQRS/Command/Command';
import { CommandHandler } from '../../../../../src/Contexts/Shared/Domain/CQRS/Command/CommandHandler';
import { CommandNotRegisteredError } from '../../../../../src/Contexts/Shared/Domain/CQRS/Command/CommandNotRegisteredError';
import { CommandHandlersInformation } from '../../../../../src/Contexts/Shared/Infraestructure/CommandBus/CommandHandlersInformation';
import { InMemoryCommandBus } from '../../../../../src/Contexts/Shared/Infraestructure/CommandBus/InMemoryCommandBus';

class UnhandledCommand extends Command {
  static COMMAND_NAME = 'unhandled.command';
}

class HandledCommand extends Command {
  static COMMAND_NAME = 'handled.command';
}

class MyCommandHandler implements CommandHandler<HandledCommand> {
  subscribedTo(): HandledCommand {
    return HandledCommand;
  }

  async handle(command: HandledCommand): Promise<void> {}
}

describe('InMemoryCommandBus', () => {
    it('accepts a command with handler', async () => {
        const handledCommand = new HandledCommand();
        const myCommandHandler = new MyCommandHandler();
        const commandHandlersInformation = new CommandHandlersInformation([myCommandHandler]);
        const commandBus = new InMemoryCommandBus(commandHandlersInformation);

        await commandBus.dispatch(handledCommand);
    });

    it('throws an error if dispatches a command without handler', async () => {
        const unhandledCommand = new UnhandledCommand();
        const commandHandlersInformation = new CommandHandlersInformation([]);
        const commandBus = new InMemoryCommandBus(commandHandlersInformation);


        expect.assertions(2);
        try {
          await commandBus.dispatch(unhandledCommand);

        } catch (error: any) {
          expect(error).toBeInstanceOf(CommandNotRegisteredError);
          expect(error.message).toBe(`The command <UnhandledCommand> hasn't a command handler associated`);
        }
    });
});

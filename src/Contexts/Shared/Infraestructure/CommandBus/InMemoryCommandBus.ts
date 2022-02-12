import { Command } from "../../Domain/CQRS/Command/Command";
import { CommandBus } from "../../Domain/CQRS/Command/CommandBus";
import { CommandHandlersInformation } from "./CommandHandlersInformation";

export class InMemoryCommandBus implements CommandBus {
  constructor(private commandHandlersInformation: CommandHandlersInformation) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlersInformation.search(command);

    await handler.handle(command);
  }
}

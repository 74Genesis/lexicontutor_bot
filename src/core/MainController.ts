/**
 * Main controller.
 * All controllers from "controllers" folder installing automatically.
 */
export default class MainController {
  private isActive = true;
  public bot;
  constructor(bot: any) {
    this.bot = bot;
  }
  install(): void {}
}

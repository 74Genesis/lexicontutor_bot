export default class MainController {
  private isActive = true;
  public bot;
  constructor(bot: any) {
    this.bot = bot;
  }
  install() {
    return 1;
  }
}

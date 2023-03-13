export abstract class PayPlanHelper {
  public static isLimitReached(servicesCount: number, servicesLimit: number) {
    return servicesLimit - servicesCount < 2;
  }
}

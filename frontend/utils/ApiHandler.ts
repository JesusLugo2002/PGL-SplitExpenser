import Constants from "expo-constants";

export class ApiHandler {
  private static API_URL = Constants.expoConfig?.extra?.apiUrl ?? "";

  static async getRequest(url: string): Promise<unknown> {
    try {
      const response = await fetch(this.API_URL + url);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error while doing the get request", err);
    }
  }

  static async postRequest(url: string, body: Record<string, any>, token?: string) {
    try {
      const response = await fetch(this.API_URL + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authentication": `Bearer ${token ? token : ""}`,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error doing the post request", err);
    }
  }
}

'use client';
interface UserInfo {

    id: number;
    name: string;
    version: string;
    email: string;
    role: string;
    status: string
}


class AppUserService {
    async getAppInfo(): Promise<UserInfo[]> {
        const res = await fetch('/api/user/list');
        if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
    }
}

export const appUserService = new AppUserService();
export type { UserInfo };

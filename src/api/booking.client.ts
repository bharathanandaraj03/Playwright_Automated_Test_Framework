import { APIRequestContext
    ,APIResponse,
    expect
 } from "@playwright/test";

 export interface Booking{
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: { checkin: string; checkout: string };
    additionalneeds?: string;
 }

 export class BookingClient{
    constructor(private readonly request: APIRequestContext){}

    async createToken(username:string, password:string) : Promise<string>{
        const response = await this.request.post('/auth',{data:{username,password}});
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.token, `Auth failed: ${JSON.stringify(body)}`).toBeTruthy();   // catches the 200 "Bad credentials" case
        return body.token;
    }

    async getBooking(id: number): Promise<APIResponse> {
        return this.request.get(`/booking/${id}`);
    }

  async createBooking(booking: Booking): Promise<APIResponse> {
        return this.request.post('/booking', { data: booking });
    }

  async updateBooking(id: number, booking: Booking, token: string): Promise<APIResponse> {
        return this.request.put(`/booking/${id}`, { data: booking, headers: { Cookie: `token=${token}` } });
    }

  async deleteBooking(id: number, token: string): Promise<APIResponse> {
        return this.request.delete(`/booking/${id}`, { headers: { Cookie: `token=${token}` } });
    }
 }
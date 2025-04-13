import { EstateStatus } from "./estate-status.model";

export interface Estate {
    id?: number;
  
    // General information
    name: string;
    type: string;
    status: EstateStatus; // Enum values
    description?: string;
    price: number;
  
    // Characteristics
    surface: number;
    city: string;
    address: string;
    imageUrl?: string;
    rooms?: number;
    bathrooms?: number;
  
    // Dates
    datePosted: string;      // yyyy-MM-dd format
    availableFrom: string;
  
    // Owner
    ownerName: string;
    contactPhone: string;
  }
  
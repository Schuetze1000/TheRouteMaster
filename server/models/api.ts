export interface Profile {
    firstname:   string;
    surname:    string;
    avatar:      string;
    homeaddress: Homeaddress;
}

export interface Homeaddress {
    number:  string;
    street:  string;
    zip:     string;
    city:    string;
    state:   string;
    country: string;
}
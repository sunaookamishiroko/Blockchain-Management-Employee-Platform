package entity

type Qrcode struct {
	WorkplaceIndex int    `json:"workplaceindex"`
	Date           string `json:"date"`
	RandomNum      int    `json:"randomnum"`
}

type LaborContract struct {
	Address        string `json:"address"`
	WpName         string `json:"wpname"`
	WpEmployer     string `json:"wpemployer"`
	EmployeeName   string `json:"employeename"`
	WorkplaceIndex int    `json:"workplaceindex"`
	Period         string `json:"period"`
	Duties         string `json:"duties"`
	WorkingTime    string `json:"workingtime"`
	WorkingDays    string `json:"workingdays"`
	Wage           string `json:"wage"`
	WageDay        string `json:"wageday"`
	Comment        string `json:"comment"`
}

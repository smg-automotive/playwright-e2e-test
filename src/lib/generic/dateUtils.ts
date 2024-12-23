export function getToday(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getLastDateOfNextMonth(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Set date to the first day of the month after the next
    const firstDayOfMonthAfterNext = new Date(year, month + 2, 1);

    // Subtract 1 day to get the last day of the next month
    const lastDayOfNextMonth = new Date(firstDayOfMonthAfterNext.getTime() - 1);

    const formattedYear = lastDayOfNextMonth.getFullYear();
    const formattedMonth = (lastDayOfNextMonth.getMonth() + 1).toString(); // No padding
    const formattedDate = lastDayOfNextMonth.getDate();

    return `${formattedYear}-${formattedMonth}-${formattedDate}`;
}

export function formatDate(inputDate: string): string {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Parse the input date
    const [year, month, day] = inputDate.split("-");

    // Convert the month number to its abbreviated name
    const monthAbbreviation = months[parseInt(month, 10) - 1];

    // Return the formatted date
    return `${year}-${monthAbbreviation}-${day}`;
}
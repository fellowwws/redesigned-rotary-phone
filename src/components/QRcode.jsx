export function QRcode({label, data}) {
    return (
        <div class="text-center">
            <img
            src={data} 
            alt={`${label}`}
            width="150" 
            />
            <span>{label}</span>
        </div>
    )
}
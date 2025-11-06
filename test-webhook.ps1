$webhookUrl = "https://mogeeb.shop/webhook/d581640e-383a-4eb1-bbb6-a8ac9be9ad40"
$body = @{message="test";timestamp=[datetime]::UtcNow.ToString("o");userId="test";sessionId="test"} | ConvertTo-Json
Write-Host "Testing webhook: $webhookUrl"
Write-Host "---"
try {
    $response = Invoke-WebRequest -Uri $webhookUrl -Method POST -Headers @{"Content-Type"="application/json"} -Body $body -UseBasicParsing
    Write-Host "SUCCESS - Status: $($response.StatusCode)"
    Write-Host $response.Content
}
catch {
    Write-Host "ERROR"
    Write-Host "Status: $($_.Exception.Response.StatusCode)"
    Write-Host "Message: $($_.Exception.Message)"
}

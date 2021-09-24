FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Net5CoreWebAPI/Net5CoreWebAPI.csproj", "Net5CoreWebAPI/"]
RUN dotnet restore "Net5CoreWebAPI/Net5CoreWebAPI.csproj"
COPY . .
WORKDIR "/src/Net5CoreWebAPI"
RUN dotnet build "Net5CoreWebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Net5CoreWebAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Net5CoreWebAPI.dll"]
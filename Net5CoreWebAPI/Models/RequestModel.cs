namespace Net5CoreWebAPI.Models
{
    public class RequestModel
    {
        /// <summary>
        /// The page index for pagination
        /// </summary>
        public int PageIndex { get; set; } = 0;

        /// <summary>
        /// Maximum item will be returned by this request.
        /// </summary>
        public int PageSize { get; set; } = 20;

        public string Search { get; set; } = string.Empty;

        // Desc or asc
        public string SortDirection { get; set; } = string.Empty;

        public string SortField { get; set; } = string.Empty;
    }
}
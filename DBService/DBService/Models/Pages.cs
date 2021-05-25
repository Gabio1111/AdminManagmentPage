using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DBService.Models
{
    public class Pages
    {
        public int m_page_id { get; set; }
        public int[] m_page_id_arr { get; set; }
        public int m_root_page { get; set; }
        public string m_page_name { get; set; }
        public string m_page_route { get; set; }
        public string m_page_css { get; set; }
        public bool ischecked { get; set; }
        public int m_grp_id { get; set; }
    }
}
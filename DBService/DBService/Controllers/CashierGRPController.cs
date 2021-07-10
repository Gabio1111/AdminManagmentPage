using DBService.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading;
using System.Web.Http;



namespace DBService.Controllers
{
    [RoutePrefix("api/cashier")]
    public class CashierGRPController : ApiController
    {

        ServerCommunicationProtocol m_ServerCommunicationProtocol;


        public CashierGRPController()
        {
            m_ServerCommunicationProtocol = ServerCommunicationProtocol.Instance;
        }

        [HttpGet]
        [Route("GetGRPById/{id}")]
        public object GetById(int id)
        {
            Dictionary<string,int> param_arr = new Dictionary<string, int>();
            param_arr.Add("id", id);
            List<object> grpList = new List<object>();
            grpList = m_ServerCommunicationProtocol.getGroups("spGRPbyID", param_arr,"group");

            return grpList[0];

        }

        [HttpGet]
        [Route("GetGRPs")]
        public List<object> GetCGroups()
        {
           
            List<object> groupList = new List<object>();
            groupList = m_ServerCommunicationProtocol.getGroups("spCashierGRPfullData",groupOrPage:"group");
            return groupList;
        }

        
        [HttpPost]
        [Route("AddGroups")]
        public int addGroup(CashierGroup cashier)
        {
            string[] paramNames = { "@GRP_Name", "@GRP_Description","@RETURN" };
            int returnedIdentity = m_ServerCommunicationProtocol.postGroupOrPages("spInsertGroupToTable", paramNames, cashier);
            return returnedIdentity;
        }

        [HttpPost]
        [Route("AddPages")]
        public int addPage(Pages page)
        {
            string[] paramNames = { "@pageRoot", "@pageName", "@pageRout", "@pageCss", "@RETURN" };
            if(page.m_root_page < 0 || string.IsNullOrEmpty(page.m_page_name)) // change condition about root
            {
                throw new Exception("cannot send empty root OR page name");
            }
            int returnedIdentity = m_ServerCommunicationProtocol.postGroupOrPages("spAddPage", paramNames,null,page,true);
            return returnedIdentity;
        }

        [HttpDelete]
        [Route("DeleteGroup/{id}")]
        public void DeleteEmployeeByID(int id)
        {
            Dictionary<string, int> param_arr = new Dictionary<string, int>();
            param_arr.Add("id", id);
            int rows_Affected = m_ServerCommunicationProtocol.deleteObject("spDeleteRowById", param_arr);

        }

        [HttpGet]
        [Route("GetPages/{id}")]
        public List<object> getPagesById(int id)
        {
            Dictionary<string, int> param_arr = new Dictionary<string, int>();
            param_arr.Add("IDGroup", id);
            List<object> pageList = new List<object>();
            pageList=m_ServerCommunicationProtocol.getGroups("spGetAllPages", param_arr, "pageWithId");
            return pageList;
        }

        [HttpGet]
        [Route("GetPages")]
        public List<object> getPages()
        {

            List<object> pageList = new List<object>();
            pageList = m_ServerCommunicationProtocol.getGroups("spGetPages", null, "page");
            return pageList;
        }


        [HttpPost]
        [Route("GroupsToPages")]
        public void groupToPage(Pages i_page)
        {
            string[] parameter_names = { "GrpToPage" , "grp_ID" };
            int affectedRows = m_ServerCommunicationProtocol.postGroupOrPages("spAttachPageToGroup", parameter_names,null, i_page);
        }

        [HttpPut]
        [Route("UpdatePage")]
        public void updatePage(Pages i_page)
        {
            string[] paramNames = { "@ID", "@Root", "@Name", "@Rout", "@Css" };
            int affectedRows = m_ServerCommunicationProtocol.updateObject("spUpdatePage", paramNames, null, i_page);
        }

        //[HttpPost]
        //[Route("AddCashier")]
        //public void addCashier(CashierWorker cashierWorker)
        //{
        //    string[] paramNames = { "@CASHIERGRPID", "@CASHIERKEY", "@CASHIERPASSWORD", "@CASHIERNAME", "@CASHIERDISABLED", "@CASHIERSAREACONTROL", "@DELFLAG", "@UPDATENUM", "@RETURN" };
        //    int returnedId = m_ServerCommunicationProtocol.postCashier("spAddCashier",paramNames,cashierWorker);
        //}

        [HttpPut]
        [Route("CtoP")]
        public void attachCashierToGrp(CashierWorker worker)
        {
            string[] paramNames = { "@CASHIERID", "@GRPID" };
            int affectedRows = m_ServerCommunicationProtocol.attachCashierToGrp("spAttachCashierToGrp2", paramNames, worker);
        }
    }
}

using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace DBService.Models
{
    public sealed class ServerCommunicationProtocol //Singleton Class and thread safe
    {
        public SqlDataReader m_reader = null;
        public SqlConnection m_myConnection;
        public SqlCommand m_sqlCommand;
        private string connectionString = @"Data Source=sqlbochkadev;Initial Catalog=ManagerServer;Persist Security Info=True;User ID=Alex;Password=DDe34-aa";//connectionString = @"Data Source=DESKTOP-58LSK5U\SQLEXPRESSGabio;Initial Catalog = testDB; Integrated Security = True";
        private static readonly object padlock = new object();
        private static readonly object padlock2 = new object();
        private static ServerCommunicationProtocol instance = null;
        private StringBuilder errorMessages = new StringBuilder();
        public int newIdentity;

        ServerCommunicationProtocol()
        {
            //m_myConnection = new SqlConnection();
            //m_myConnection.ConnectionString = connectionString;
        }


        public static ServerCommunicationProtocol Instance
        {
            get
            {
                lock (padlock)
                {
                    if (instance == null)
                    {
                        instance = new ServerCommunicationProtocol();
                    }
                    return instance;
                }
            }
        }

        private void openConnction(string i_sqlCmd, Dictionary<string, int> paramDic = null)
        {
            try 
            {
                m_sqlCommand = new SqlCommand(i_sqlCmd, m_myConnection);
                if (i_sqlCmd.StartsWith("MNG_sp"))
                {
                    m_sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                }
                else
                {
                    m_sqlCommand.CommandType = System.Data.CommandType.Text;
                }
                if (paramDic != null)
                {
                    foreach (KeyValuePair<string, int> item in paramDic)
                    {
                        string str = string.Format("@{0}", item.Key);
                        m_sqlCommand.Parameters.Add(new SqlParameter(str, item.Value));
                    }

                }
                m_myConnection.Open();

            }
            catch(SqlException ex)
            {
                for (int i = 0; i < ex.Errors.Count; i++)
                {
                    errorMessages.Append("Index #" + i + "\n" +
                        "Message: " + ex.Errors[i].Message + "\n" +
                        "LineNumber: " + ex.Errors[i].LineNumber + "\n" +
                        "Source: " + ex.Errors[i].Source + "\n" +
                        "Procedure: " + ex.Errors[i].Procedure + "\n");
                }
                Console.WriteLine(errorMessages.ToString());
            }

        }

        public List<object> getGroups(string i_sqlCmd, Dictionary<string, int> paramDic = null, string groupOrPage = null)
        {
 
            lock (padlock2) {
                using (m_myConnection = new SqlConnection(connectionString))
                {
                    // if (m_myConnection.State == ConnectionState.Closed)

                    try
                    {
                        openConnction(i_sqlCmd, paramDic);
                        m_reader = m_sqlCommand.ExecuteReader();
                    }
                    catch (SqlException ex)
                    {
                        errorMessages.Append(ex);
                        Console.WriteLine(errorMessages);
                    }

                    List<object> cList = new List<object>();
                    switch (groupOrPage)
                    {
                        case "group":

                            while (m_reader.Read())
                            {
                                CashierGroup cashier = new CashierGroup();
                                cashier.m_GRP_id = (int)m_reader.GetValue(0);
                                cashier.m_GRP_Name = m_reader.GetValue(1).ToString();
                                cashier.m_Description = m_reader.GetValue(2).ToString();
                                cList.Add(cashier);
                            }
                            break;
                        case "pageWithId":

                            while (m_reader.Read())
                            {
                                Pages page = new Pages();

                                page.m_page_id = (int)m_reader.GetValue(0);
                                page.m_page_name = m_reader.GetValue(1).ToString();
                                if (m_reader.GetValue(2) != DBNull.Value)
                                {
                                    page.m_grp_id = (int)m_reader.GetValue(2);
                                }
                                cList.Add(page);

                            }
                            break;

                        case "page":

                            while (m_reader.Read())
                            {
                                Pages page = new Pages();

                                page.m_page_id = (int)m_reader.GetValue(0);
                                page.m_root_page = (int)m_reader.GetValue(1);
                                page.m_page_name = m_reader.GetValue(2).ToString();
                                if (m_reader.GetValue(3) != DBNull.Value)
                                {
                                    page.m_page_route = m_reader.GetValue(3).ToString();
                                }
                                else
                                {
                                    page.m_page_route = "NULL";
                                }
                                if (m_reader.GetValue(4) != DBNull.Value)
                                {
                                    page.m_page_css = m_reader.GetValue(4).ToString();
                                }
                                else
                                {
                                    page.m_page_css = "NULL";
                                }


                                cList.Add(page);
                            }
                            break;

                        default:
                            break;
                    }

                  //  m_myConnection.Close();
                    return cList;
                }
            }
                

        }

        public int postGroupOrPages(string i_sqlCmd,string[] i_paramNames,CashierGroup i_cashier=null,Pages i_pages = null,bool addPage = false)
        {

            using (m_myConnection = new SqlConnection(connectionString))
            {
                openConnction(i_sqlCmd);

                if (i_cashier != null)
                {

                    foreach (string name in i_paramNames)
                    {
                        if (!name.Contains("@"))
                        {
                            string str = string.Format("@{0}", name);
                        }
                        switch (name)
                        {
                            case "@GRP_Name":
                                m_sqlCommand.Parameters.AddWithValue(name, i_cashier.m_GRP_Name);
                                break;

                            case "@GRP_Description":
                                m_sqlCommand.Parameters.AddWithValue(name, i_cashier.m_Description);
                                break;

                            case "@RETURN":
                                m_sqlCommand.Parameters.Add(name, SqlDbType.Int);
                                m_sqlCommand.Parameters[name].Direction = ParameterDirection.Output;

                                break;

                            default:
                                break;
                        }

                    }
                    int affectedRows = m_sqlCommand.ExecuteNonQuery();
                    newIdentity = Convert.ToInt32(m_sqlCommand.Parameters["@RETURN"].Value);
                    return newIdentity == 0 ? throw new NullReferenceException(" output parameter is null") : newIdentity;
                }
                else if (i_pages != null)
                {
                    if (addPage != true)
                    {
                        DataTable grp_to_pages = new DataTable();
                        grp_to_pages.Columns.Add("GRPID", typeof(Int32));
                        grp_to_pages.Columns.Add("PAGEID", typeof(Int32));
                        foreach (int item in i_pages.m_page_id_arr)
                        {
                            grp_to_pages.Rows.Add(i_pages.m_grp_id, item);
                        }

                        foreach (string name in i_paramNames)
                        {
                            if (!name.Contains("@"))
                            {
                                string str = string.Format("@{0}", name);

                                switch (str)
                                {
                                    case "@grp_ID":
                                        m_sqlCommand.Parameters.AddWithValue(name, i_pages.m_grp_id);
                                        break;

                                    case "@GrpToPage":
                                        m_sqlCommand.Parameters.AddWithValue(name, grp_to_pages);
                                        break;


                                    default:
                                        break;
                                }
                            }

                        }

                    }
                    else
                    {
                        foreach (string name in i_paramNames)
                        {
                            if (!name.Contains("@"))
                            {
                                string str = string.Format("@{0}", name);
                            }
                            switch (name)
                            {
                                case "@pageRoot":
                                    m_sqlCommand.Parameters.AddWithValue(name, i_pages.m_root_page);
                                    break;

                                case "@pageName":
                                    m_sqlCommand.Parameters.AddWithValue(name, i_pages.m_page_name);
                                    break;
                                
                                case "@pageRout":

                                    m_sqlCommand.Parameters.AddWithValue(name, i_pages.m_page_route);
                                    break;   
                                
                                case "@pageCss":
                                    m_sqlCommand.Parameters.AddWithValue(name, i_pages.m_page_css);
                                    break;

                                case "@RETURN":
                                    m_sqlCommand.Parameters.Add(name, SqlDbType.Int);
                                    m_sqlCommand.Parameters[name].Direction = ParameterDirection.Output;

                                    break;

                                default:
                                    break;
                            }

                        }
                        int affectedRows = m_sqlCommand.ExecuteNonQuery();
                        newIdentity = Convert.ToInt32(m_sqlCommand.Parameters["@RETURN"].Value);
                        return newIdentity == 0 ? throw new NullReferenceException(" output parameter is null") : newIdentity;
                    }
                }
                return m_sqlCommand.ExecuteNonQuery();
            }
        }

        public int deleteObject(string i_sqlCmd, Dictionary<string, int> paramDic = null)
        {
            using (m_myConnection = new SqlConnection(connectionString))
            {
                openConnction(i_sqlCmd, paramDic);
                 return m_sqlCommand.ExecuteNonQuery();
            }
        }

        public int updateObject(string i_sqlCmd, string[] i_paramNames, CashierGroup i_cashier = null, Pages i_pages = null)
        {
            using (m_myConnection = new SqlConnection(connectionString))
            {
                openConnction(i_sqlCmd);

                if (i_cashier != null) { }
                else
                {
                    foreach (string name in i_paramNames)
                    {
                        if (!name.Contains("@"))
                        {
                            string str = string.Format("@{0}", name);
                        }
                        switch (name)
                        {
                            case "@ID":
                                m_sqlCommand.Parameters.AddWithValue(name, i_pages.m_page_id);
                                break;

                            case "@Root":
                                m_sqlCommand.Parameters.AddWithValue(name, i_pages.m_root_page);
                                break;

                            case "@Name":
                                m_sqlCommand.Parameters.AddWithValue(name, i_pages.m_page_name);
                                break;

                            case "@Rout":

                                m_sqlCommand.Parameters.AddWithValue(name, i_pages.m_page_route);
                                break;

                            case "@Css":
                                m_sqlCommand.Parameters.AddWithValue(name, i_pages.m_page_css);
                                break;

                            default:
                                break;
                        }

                    }
                }
                return m_sqlCommand.ExecuteNonQuery();
            }
        }

        //public int postCashier(string sp,string[] i_params,CashierWorker cashierWorker)
        //{
        //    using(m_myConnection = new SqlConnection(connectionString))
        //    {
        //        openConnction(sp);

        //        foreach (string name in i_params)
        //        {
        //            if (!name.Contains("@"))
        //            {
        //                string str = string.Format("@{0}", name);
        //            }
        //            switch (name)
        //            {

        //                case "@CASHIERGRPID":

        //                    m_sqlCommand.Parameters.AddWithValue(name, cashierWorker.m_CashierGrpId);
        //                    break;

        //                case "@CASHIERKEY":
        //                    m_sqlCommand.Parameters.AddWithValue(name, cashierWorker.m_CashierKey);
        //                    break;

        //                case "@CASHIERPASSWORD":

        //                    m_sqlCommand.Parameters.AddWithValue(name, cashierWorker.m_CashierPassword);
        //                    break;

        //                case "@CASHIERNAME":
        //                    m_sqlCommand.Parameters.AddWithValue(name, cashierWorker.m_CashierName);
        //                    break;

        //                case "@CASHIERDISABLED":
        //                    m_sqlCommand.Parameters.AddWithValue(name, cashierWorker.m_CashierDisabled);
        //                    break;

        //                case "@CASHIERSAREACONTROL":
        //                    m_sqlCommand.Parameters.AddWithValue(name, cashierWorker.m_CashierAreaControl);
        //                    break;

        //                case "@DELFLAG":
        //                    m_sqlCommand.Parameters.AddWithValue(name, cashierWorker.m_DelFlag);
        //                    break;

        //                case "@UPDATENUM":
        //                    m_sqlCommand.Parameters.AddWithValue(name, cashierWorker.m_UpdateNum);
        //                    break;

        //                case "@RETURN":
        //                    m_sqlCommand.Parameters.Add(name, SqlDbType.Int);
        //                    m_sqlCommand.Parameters[name].Direction = ParameterDirection.Output;

        //                    break;


        //                default:
        //                    break;
        //            }

        //        }

        //        int affectedRows = m_sqlCommand.ExecuteNonQuery();
        //        newIdentity = Convert.ToInt32(m_sqlCommand.Parameters["@RETURN"].Value);
        //        return newIdentity == 0 ? throw new NullReferenceException(" output parameter is null") : newIdentity;
        //    }
        //}

        public int attachCashierToGrp(string sp, string[] i_params, CashierWorker worker)
        {
            using (m_myConnection = new SqlConnection(connectionString))
            {
                openConnction(sp);

                foreach (string name in i_params)
                {
                    if (!name.Contains("@"))
                    {
                        string str = string.Format("@{0}", name);
                    }
                    switch (name)
                    {

                        case "@GRPID":

                            m_sqlCommand.Parameters.AddWithValue(name, worker.m_CashierGrpId);
                            break;

                        case "@CASHIERID":
                            m_sqlCommand.Parameters.AddWithValue(name, worker.m_CashierId);
                            break;

                        default:
                            break;
                    }

                }

                return m_sqlCommand.ExecuteNonQuery();
            }

        }

    }


}
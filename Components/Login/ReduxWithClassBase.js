import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CountBarChart from "./CountBarChart";
import ChargeBarChart from "./ChargeBarChart";
import Eclips from "../images/loading_spinner.gif";
import GifLoader from "react-gif-loader";
import settingIcon from "../images/setting-icon-blue.png";
import moment from "moment";
import momentTZ from "moment-timezone";
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";
import GridHeading from "./GridHeading";
import GPopup from "./GPopup";
import { isNullOrUndefined } from "util";
import $ from "jquery";
import VisitUsed from "./VisitUsed";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Cell,
    Pie,
    PieChart,
    LabelList,
    Line,
    LineChart,
} from "recharts";
import {
    MDBDataTable,
    MDBBtn,
    MDBTableHead,
    MDBTableBody,
    MDBTable,
} from "mdbreact";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    withRouter,
} from "react-router-dom";

//Redux Actions
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectTabPageAction } from "../actions/selectTabAction";
import { loginAction } from "../actions/LoginAction";
import { selectTabAction } from "../actions/selectTabAction";
import { userInfo } from "../actions/userInfo";
import { setICDAction } from "../actions/SetICDAction";
import { setCPTAction } from "../actions/SetCPTAction";
import { taxonomyCodeAction } from "../actions/TaxonomyAction";
import { setInsurancePlans } from "../actions/InsurancePlanAction";
import { setReceiverAction } from "../actions/ReceiverAction";
import { setRemarkCodeAction } from "../actions/RemarkCodeAction";
import { setAdjustmentCodeAction } from "../actions/AdjustmentCodeAction";
import { BillingClaimAction } from "../actions/BillingClaimAction";
import { BillingFollowAction } from "../actions/BillingFollowAction";
import { BillingDailySummaryAction } from "../actions/BillingDailySummaryAction";
import { VisitChargeDataAction } from "../actions/VisitChargeDataAction";
import { TopPayerAction } from "../actions/TopPayerAction";
import { PracticeAnalysisAction } from "../actions/PracticeAnalysisAction";
import { PlanFollowupAction } from "../actions/PlanFollowupAction";
import { AgingDataAction } from "../actions/AgingDataAction";
import { RefreshPageAction } from "../actions/RefreshAction";
import { stat } from "fs";

const COLORS = [
    "#0088FE",
    "#F8BD28",
    "#45B239",
    "#FF8042",
    "#6033aa",
    "#795548",
    "#000000",
    "#004b44",
    "#808080",
    "#00bcd4",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
const renderCustomizedFollowupLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const PaitData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
];
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.url = process.env.REACT_APP_URL + "/Dashboard/";
        this.BillingUrl = process.env.REACT_APP_URL + "/BillingDashboard/";
        this.commonUrl = process.env.REACT_APP_URL + "/Common/";
        this.BatchUrl = process.env.REACT_APP_URL + "/PatientAuthorization/";
        this.patientPlanUrl = process.env.REACT_APP_URL + "/PatientPlan/";
        this.paymentCheckUrl = process.env.REACT_APP_URL + "/PaymentCheck/";

        //Authorization Token
        this.config = {
            headers: {
                Authorization: "Bearer  " + this.props.loginObject.token,
                Accept: "*/*",
            },
        };
        this.dataLoaded = false;
        this.preToken = "";

        this.practiseGraph = {
            month: "",
            charges: "",
            payment: "",
            adjustment: "",
            balance: "",
            totalBalance: "",
        };
        this.AppointmentSummeryModel = {
            dateFrom: null,
            dateTo: null,
            value: "T",
        };
        this.DosModel = {
            dateFrom: null,
            dateTo: null,
            value: "DOS",
        };
        this.state = {
            DosModel: this.DosModel,
            AppointmentSummeryModel: this.AppointmentSummeryModel,
            practiseGraph: this.practiseGraph,
            PaiChartData: [],
            AccountAuth: [],
            cancelled: "",
            noShow: "",
            rescheduled: "",
            Scheduled: "",
            confirmed: "",
            visitSummeryData: [],
            precticeSummeryData: [],
            pageToLoad: false,
            landingPage: true,
            data: [],
            paperSubmission: 0,
            electronicSubmission: 0,
            systemReject: 0,
            clameReject: 0,
            clameDenied: 0,
            eraNeedPosting: 0,
            eraFailed: 0,
            planeFollowUp: 0,
            patientFollowUp: 0,
            claimSubmitedDaily: 0,
            paymentReceived: 0,
            checkPosted: 0,
            claimEntered: 0,
            planeFollowUpDaily: 0,
            patientFollowUpDaily: 0,
            eraFailedDaily: 0,
            agingData: [],
            FollowUpData: [],
            loading: false,
            chargePaymentData: [],
            patientAuthID: 0,
            value: "T",
            loader1: false,
            loader2: false,
            loader3: false,
            loader4: false,
            loader5: false,
            loader6: false,
            loader7: false,
            loader8: false,
            loader9: false,
            loader10: false,
            loader11: false,
            popupName: "",
            patientPopup: false,
            showVPopup: false,
            refreshDashboard: false,
        };
        this.openPatientPopup = this.openPatientPopup.bind(this);
        this.closePatientPopup = this.closePatientPopup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.openVisitPopup = this.openVisitPopup.bind(this);
        // this.closeVisitPopUp = this.closeVisitPopUp.bind(this);
    }
    val(value) {
        if (isNullOrUndefined(value)) return " ";
        else return value;
    }
    openPatientPopup(name, id) {
        this.setState({ popupName: name, patientPopup: true, id: id });
    }

    closePatientPopup() {
        this.setState({ popupName: "", patientPopup: false });
    }
    convertNumber = (Number) => {
        var count;
        count = Number.toLocaleString(undefined, { maximumFractionDigits: 2 });
        return count;
    };

    closevisitPopup = () => {
        $("#submittedVisitsModal").hide();
        this.setState({ showVPopup: false });
    };

    openvisitPopup = (id) => {
        // console.log(id);
        this.setState({
            showVPopup: true,
            patientAuthID: id,
        });
    };

    closePopup = () => {
        $("#myModal").hide();
        this.setState({ popupName: "" });
    };
    openPopup = (name, id) => {
        this.setState({ popupName: name, id: id });
    };

    getAppointmentSummaryData = () => {
        // console.log("AppointmentSummeryModel", this.state.AppointmentSummeryModel);
        axios
            .post(
                this.url + "FindAppointmentData",
                this.state.AppointmentSummeryModel,
                this.config
            )
            .then((response) => {
                // console.log("AppointmentSummeryModel Response", response.data);
                this.setState({
                    cancelled: response.data.cancelled,
                    noShow: response.data.noShow,
                    rescheduled: response.data.rescheduled,
                    scheduled: response.data.scheduled,
                    confirmed: response.data.confirmed,
                    checkOut: response.data.checkOut,
                    checkIN: response.data.checkIN,
                });
            });
    };

    async componentWillMount() {
        this.preToken = this.props.loginObject.token;
        this.dataLoaded = true;

        await this.setState({
            billingSummeryLoader1: true,
            billingSummeryLoader2: true,
            billingSummeryLoader3: true,
            loader1: true,
            loader2: true,
            loader3: true,
            loader4: true,
            loader5: true,
            loader6: true,
            loader7: true,
            loader8: true,
            loader9: true,
        });

        try {
            await this.setState({
                loading: true,
            });

            if (
                this.props.planFollowUp.length == 0 ||
                this.props.refreshDashboard == true ||
                this.state.refreshDashboard == true
            ) {
                try {
                    axios
                        .post(
                            this.BillingUrl + "GetPlanFollowUpGraph",
                            this.state.DosModel,
                            this.config
                        )
                        .then((response) => {
                            this.props.PlanFollowupAction(response.data);
                            let followUpArray = [];
                            if (response.data) {
                                response.data.map((row, i) => {
                                    followUpArray.push({
                                        name: row.reasonName,
                                        visitCount: row.visitCount,
                                    });
                                });
                            }
                            this.setState({
                                FollowUpChart: followUpArray,
                                loader5: false,
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            this.setState({ loader5: false });
                        });
                } catch {
                    this.setState({ loader5: false });
                }
            } else {
                let followUpArray = [];
                this.props.planFollowUp.map((row, i) => {
                    followUpArray.push({
                        name: row.reasonName,
                        visitCount: row.visitCount,
                    });
                });

                this.setState({
                    FollowUpChart: followUpArray,
                    loader5: false,
                });
            }

            if (
                this.props.practiceAnalysis == 0 ||
                this.props.refreshDashboard == true ||
                this.state.refreshDashboard == true
            ) {
                try {
                    axios
                        .post(
                            this.BillingUrl + "GetChargePaymentGraph",
                            this.state.DosModel,
                            this.config
                        )
                        .then((response) => {
                            this.props.PracticeAnalysisAction(response.data);
                            let chargePaymentArray = [];
                            this.setState({
                                chargePaymentData: response.data,
                                loader4: false,
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            this.setState({ loader4: false });
                        });
                } catch {
                    this.setState({ loader4: false });
                }
            } else {
                this.setState({
                    chargePaymentData: this.props.practiceAnalysis,
                    loader4: false,
                });
            }

            if (
                this.props.topPayer.length == 0 ||
                this.props.refreshDashboard == true ||
                this.state.refreshDashboard == true
            ) {
                try {
                    axios
                        .post(
                            this.url + "FindTopSubmissions",
                            this.state.DosModel,
                            this.config
                        )
                        .then((response) => {
                            this.props.TopPayerAction(response.data);
                            let arrayToPush = [];
                            if (response.data) {
                                response.data.map((row, i) => {
                                    arrayToPush.push({
                                        name: row.payerName,
                                        count: row.count,
                                    });
                                });
                            }
                            this.setState({ PaiChartData: arrayToPush, loader3: false });
                        })
                        .catch((error) => {
                            console.log("error : ", error);
                            this.setState({ loader3: false });
                        });
                } catch {
                    this.setState({ loader3: false });
                }
            } else {
                let arrayToPush = [];

                this.props.topPayer.map((row, i) => {
                    arrayToPush.push({
                        name: row.payerName,
                        count: row.count,
                    });
                });

                this.setState({ PaiChartData: arrayToPush, loader3: false });
            }

            this.setState({ loading: true });
            //AppointmentData
            try {
                this.getAppointmentSummaryData();
            } catch {
                this.setState({ loading: false });
            }
            this.setState({ loading: true });
            if (
                this.props.agingData.length == 0 ||
                this.props.refreshDashboard == true ||
                this.state.refreshDashboard == true
            ) {
                try {
                    axios
                        .post(this.url + "GetAgingData", this.state.DosModel, this.config)
                        .then((response) => {
                            this.props.AgingDataAction(response.data);
                            this.setState({ agingData: response.data, loader6: false });
                        })
                        .catch((error) => {
                            this.setState({ loader6: false });
                        });
                } catch {
                    this.setState({ loader6: false });
                }
            } else {
                this.setState({ agingData: this.props.agingData, loader6: false });
            }

            try {
                axios
                    .post(
                        this.BillingUrl + "GetPlanFollowUpData",
                        this.state.DosModel,
                        this.config
                    )
                    .then((response) => {
                        console.log("GetPlanFollowUpData", response.data);
                        this.setState({ FollowUpData: response.data });
                    })
                    .catch((error) => {
                        console.log("Error : ", error);
                    });
            } catch {
                this.setState({ loading: false });
            }

            if (
                this.props.billingClaims.length == 0 ||
                this.props.refreshDashboard == true ||
                this.state.refreshDashboard == true
            ) {
                // console.log("First Call", this.props.billingClaims.length);
                this.props.refreshDashboard == true ? this.props.BillingClaimAction(null) : this.props.BillingClaimAction(0);
                try {
                    axios
                        .get(this.BillingUrl + "BillingClaimAndERASummary", this.config)
                        .then((response) => {
                            this.props.BillingClaimAction(response.data);
                            this.setState({
                                paperSubmission: response.data.paperSubmission,
                                electronicSubmission: response.data.electronicSubmission,
                                systemReject: response.data.systemReject,
                                clameReject: response.data.clameReject,
                                clameDenied: response.data.clameDenied,
                                eraNeedPosting: response.data.eraNeedPosting,
                                eraFailed: response.data.eraFailed,
                                billingSummeryLoader1: false,
                            });
                        });
                } catch {
                    this.setState({ billingSummeryLoader1: false });
                }
            } else {
                // console.log("Not Zero", this.props.billingClaims, this.props.billingClaims.length);
                this.setState({
                    paperSubmission: this.props.billingClaims.paperSubmission,
                    electronicSubmission: this.props.billingClaims.electronicSubmission,
                    systemReject: this.props.billingClaims.systemReject,
                    clameReject: this.props.billingClaims.clameReject,
                    clameDenied: this.props.billingClaims.clameDenied,
                    eraNeedPosting: this.props.billingClaims.eraNeedPosting,
                    eraFailed: this.props.billingClaims.eraFailed,
                    billingSummeryLoader1: false,
                });
            }

            if (
                this.props.billingFollowup.length == 0 ||
                this.props.refreshDashboard == true ||
                this.state.refreshDashboard == true
            ) {
                try {
                    axios
                        .get(
                            this.BillingUrl + "BillingFollowUpAndOtherSummary",
                            this.config
                        )
                        .then((response) => {
                            this.props.BillingFollowAction(response.data);
                            this.setState({
                                planeFollowUp: response.data.planeFollowUp,
                                patientFollowUp: response.data.patientFollowUp,
                                billingSummeryLoader2: false,
                            });
                        });
                } catch {
                    this.setState({ billingSummeryLoader2: false });
                }
            } else {
                this.setState({
                    planeFollowUp: this.props.billingFollowup.planeFollowUp,
                    patientFollowUp: this.props.billingFollowup.patientFollowUp,
                    billingSummeryLoader2: false,
                });
            }

            if (
                this.props.billingDailySummary.length == 0 ||
                this.props.refreshDashboard == true ||
                this.state.refreshDashboard == true
            ) {
                try {
                    axios
                        .get(this.BillingUrl + "BillingDailySummary", this.config)
                        .then((response) => {
                            this.props.BillingDailySummaryAction(response.data);
                            this.setState({
                                claimSubmitedDaily: response.data.claimSubmitedDaily,
                                paymentReceived: response.data.paymentReceived,
                                checkPosted: response.data.checkPosted,
                                claimEntered: response.data.claimEntered,
                                planeFollowUpDaily: response.data.planeFollowUpDaily,
                                patientFollowUpDaily: response.data.patientFollowUpDaily,
                                eraFailedDaily: response.data.eraFailedDaily,
                                billingSummeryLoader3: false,
                            });
                        });
                } catch {
                    this.setState({ billingSummeryLoader3: false });
                }
            } else {
                this.setState({
                    claimSubmitedDaily: this.props.billingDailySummary.claimSubmitedDaily,
                    paymentReceived: this.props.billingDailySummary.paymentReceived,
                    checkPosted: this.props.billingDailySummary.checkPosted,
                    claimEntered: this.props.billingDailySummary.claimEntered,
                    planeFollowUpDaily: this.props.billingDailySummary.planeFollowUpDaily,
                    patientFollowUpDaily: this.props.billingDailySummary
                        .patientFollowUpDaily,
                    eraFailedDaily: this.props.billingDailySummary.eraFailedDaily,
                    billingSummeryLoader3: false,
                });
            }

            if (
                this.props.visitCharge.length == 0 ||
                this.props.refreshDashboard == true ||
                this.state.refreshDashboard == true
            ) {
                try {
                    axios
                        .post(
                            this.url + "FindVisitChargeData",
                            this.state.DosModel,
                            this.config
                        )
                        .then((response) => {
                            this.props.VisitChargeDataAction(response.data);
                            let visitSummery = [];
                            response.data.map((row, i) => {
                                visitSummery.push({
                                    month: row.month,
                                    count: row.count,
                                    charges: row.charges,
                                    yearMonth: row.yearMonth,
                                });
                            });

                            this.setState({ visitSummeryData: visitSummery, loader2: false });
                        });
                } catch {
                    this.setState({ loader2: false });
                }
            } else {
                let visitSummery = [];
                this.props.visitCharge.map((row, i) => {
                    visitSummery.push({
                        month: row.month,
                        count: row.count,
                        charges: row.charges,
                        yearMonth: row.yearMonth,
                    });
                });

                this.setState({ visitSummeryData: visitSummery, loader2: false });
            }
        } catch {
            // await this.setState({ loading: false });
        }
        // await this.setState({ loading: false });

        try {
            axios
                .get(this.BatchUrl + "FindExpiringAuthorizations", this.config)
                .then((response) => {
                    // console.log("FindExpiringAuthorizations", response.data);
                    let AccountSummeryList = [];
                    response.data.map((row, i) => {
                        AccountSummeryList.push({
                            id: row.id,
                            accountNo: (
                                <MDBBtn
                                    className="gridBlueBtn"
                                    onClick={() =>
                                        this.openPatientPopup("patient", row.patiendID)
                                    }
                                >
                                    {" "}
                                    {this.val(row.accountNo)}
                                </MDBBtn>
                            ),

                            authorizationNo: row.authorizationNo,
                            visitsAllowed: row.visitsAllowed,

                            visitsUsed: (
                                <MDBBtn
                                    className="gridBlueBtn"
                                    onClick={() => this.openvisitPopup(row.patientAuthId)}
                                >
                                    {" "}
                                    {this.val(row.visitsUsed)}
                                </MDBBtn>
                            ),

                            visitsRemaining: row.visitsRemaining,
                            startDate: row.startDate,
                            expiryDate: row.expiryDate,
                        });
                    });

                    this.setState({ AccountAuth: AccountSummeryList, loader11: false });
                });
        } catch {
            this.setState({ loader11: false });
        }

        // ==================================================== APIs for reducer data ===========================================

        //Get ICDs
        if (this.props.icdCodes.length > 0 == false) {
            axios(this.commonUrl + "GetICDS", this.config)
                .then((response) => {
                    this.props.setICDAction(this.props, response.data, "SETICD", true);

                    this.dataLoaded = true;
                    this.setState({ loading: false });
                })
                .catch((error) => {
                    console.log("Get ICDs Error Response : ", error);
                });
        }
        // } catch {}

        ///Get CPTs
        try {
            if (this.props.cptCodes.length > 0 == false) {
                axios(this.commonUrl + "GetCPTS", this.config)
                    .then((response) => {
                        this.props.setCPTAction(this.props, response.data, "SETCPT");
                        this.dataLoaded = true;
                    })
                    .catch((error) => {
                        console.log("Get CPTs Error Response : ", error);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } catch { }

        //Get Taxonomy Code
        try {
            if (this.props.taxonomyCode.length > 0 == false) {
                axios
                    .get(this.commonUrl + "GetTaxonomy", this.config)
                    .then((response) => {
                        this.props.taxonomyCodeAction(
                            this.props,
                            response.data,
                            "TAXONOMYCODES"
                        );
                        this.dataLoaded = true;
                    })
                    .catch((error) => {
                        console.log(JSON.stringify(error));
                    });
            }
        } catch { }

        //Get Insurance Plans
        try {
            axios
                .get(this.patientPlanUrl + "getprofiles", this.config)
                .then((response) => {
                    this.props.setInsurancePlans(response.data);
                })
                .then((error) => { });
        } catch { }

        try {
            await axios
                .get(this.paymentCheckUrl + "GetProfiles", this.config)
                .then((response) => {
                    this.props.setReceiver(response.data.receiver);
                    this.props.setAdjustmentCode(response.data.adjustmentCodes);
                    this.props.setRemarkCode(response.data.remarkCodes);
                })
                .catch((error) => { });
        } catch { }

        // console.log("End of will mount ")
        this.props.RefreshPageAction(false);
    }

    componentWillReceiveProps = async (newProps) => {
        // const value= newProps.refreshDashboard;

        this.setState({ refreshDashboard: true });
        // console.log("New props", newProps);
        // console.log("Old props", this.props);
        if (this.props.loginObject.token != this.preToken) {
            this.preToken = this.props.loginObject.token;
            this.config.headers.Authorization =
                "Bearer  " + this.props.loginObject.token;
            if (this.dataLoaded == true) {
                this.componentWillMount();
                // this.dataLoaded=false
            } else {
                this.dataLoaded = false;
            }
        }
    };

    async handleChange(event) {
        await this.setState({
            AppointmentSummeryModel: {
                ...this.state.AppointmentSummeryModel,
                [event.target.name]: event.target.value,
            },
        });

        try {
            await this.getAppointmentSummaryData();
        } catch { }
    }

    DosHandleChange = async (event) => {
        this.setState({
            loader2: true,
            loader3: true,
            loader4: true,
            loader5: true,
            loader6: true,
            loader7: true,
            loader8: true,
            loader9: true,
        });

        this.setState({
            DosModel: {
                ...this.state.DosModel,
                [event.target.name]: event.target.value,
            },
        });

        try {
            axios
                .post(
                    this.url + "FindVisitChargeData",
                    { dateFrom: null, dateTo: null, value: event.target.value },
                    this.config
                )
                .then((response) => {
                    let visitSummery = [];
                    response.data.map((row, i) => {
                        visitSummery.push({
                            month: row.month,
                            count: row.count,
                            charges: row.charges,
                            yearMonth: row.yearMonth,
                        });
                    });
                    this.setState({ visitSummeryData: visitSummery, loader2: false });
                })
                .catch({ loader: false });
        } catch {
            this.setState({ loader2: false });
        }

        try {
            axios
                .post(
                    this.BillingUrl + "GetPlanFollowUpGraph",
                    { dateFrom: null, dateTo: null, value: event.target.value },
                    this.config
                )
                .then((response) => {
                    let followUpArray = [];
                    if (response.data) {
                        response.data.map((row, i) => {
                            followUpArray.push({
                                name: row.reasonName,
                                visitCount: row.visitCount,
                            });
                        });
                    }
                    this.setState({
                        FollowUpChart: followUpArray,
                        loader5: false,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ loader5: false });
                });
        } catch {
            this.setState({ loader5: false });
        }
        try {
            axios
                .post(
                    this.BillingUrl + "GetChargePaymentGraph",
                    { dateFrom: null, dateTo: null, value: event.target.value },
                    this.config
                )
                .then((response) => {
                    this.props.PracticeAnalysisAction(response.data);
                    let chargePaymentArray = [];
                    this.setState({
                        chargePaymentData: response.data,
                        loader4: false,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ loader4: false });
                });
        } catch {
            this.setState({ loader4: false });
        }
        try {
            axios
                .post(
                    this.url + "FindTopSubmissions",
                    { dateFrom: null, dateTo: null, value: event.target.value },
                    this.config
                )
                .then((response) => {
                    let arrayToPush = [];
                    if (response.data) {
                        response.data.map((row, i) => {
                            arrayToPush.push({
                                name: row.payerName,
                                count: row.count,
                            });
                        });
                    }
                    this.setState({ PaiChartData: arrayToPush, loader3: false });
                })
                .catch((error) => {
                    console.log("error : ", error);
                    this.setState({ loader3: false });
                });
        } catch {
            this.setState({ loader3: false });
        }
        try {
            axios
                .post(
                    this.url + "GetAgingData",
                    { dateFrom: null, dateTo: null, value: event.target.value },
                    this.config
                )
                .then((response) => {
                    // console.log("getAginngData", response.data);
                    let AgingList = [];
                    response.data.map((row, i) => {
                        AgingList.push({
                            name: row.name,
                            range0_30: row.range0_30,
                            range31_60: row.range31_60,
                            range61_90: row.range61_90,
                            range91_120: row.range91_120,
                            range120plus: row.range120plus,
                            total: row.total,
                        });
                    });
                    this.setState({ agingData: AgingList, loader6: false });
                })
                .catch((error) => {
                    this.setState({ loader6: false });
                });
        } catch {
            this.setState({ loader6: false });
        }
        try {
            axios
                .post(
                    this.BillingUrl + "GetPlanFollowUpData",
                    { dateFrom: null, dateTo: null, value: event.target.value },
                    this.config
                )
                .then((response) => {
                    this.setState({ FollowUpData: response.data, loading: false });
                })
                .catch((error) => {
                    console.log("Error : ", error);
                });
        } catch { }
    };

    openVisitScreen(id) {
        this.props.history.push("/Submission");
    }

    handleCheckSubmission = () => {
        this.setState({
            pageToLoad: !this.state.pageToLoad,
        });
    };

    refreshDashboard = async () => {
        await this.setState({ refreshDashboard: true });
        if (this.state.refreshDashboard == true) {
            this.props.BillingClaimAction(null);
            this.props.BillingFollowAction(null);
            this.props.BillingDailySummaryAction(null);
            this.props.VisitChargeDataAction(null);
            this.props.TopPayerAction(null);
            this.props.PracticeAnalysisAction(null);
            this.props.PlanFollowupAction(null);
            this.props.AgingDataAction(null);
            this.componentWillMount();
        }
    };

    render() {
        let popup = "";

        if (this.state.showPopup) {
            // popup = (
            //   <NewPlanFollowupModal
            //     onClose={() => this.closePLanFollowupPopup}
            //     id={this.state.id}
            //   ></NewPlanFollowupModal>
            // );
        } else if (this.state.patientPopup) {
            popup = (
                <GPopup
                    onClose={() => this.closePatientPopup}
                    id={this.state.id}
                    popupName={this.state.popupName}
                ></GPopup>
            );
        } else if (this.state.showVPopup) {
            popup = (
                <VisitUsed
                    onClose={() => this.closevisitPopup}
                    patientAuthID={this.state.patientAuthID}
                ></VisitUsed>
            );
        } else popup = <React.Fragment></React.Fragment>;
        const AccountAuth = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc",
                    width: 150,
                },

                {
                    label: "ACCOUNT #",
                    field: "accountNo",
                    sort: "asc",
                    width: 100,
                },
                {
                    label: "AUTHORIZATION",
                    field: "authorizationNo",
                    sort: "asc",
                    width: 100,
                },

                {
                    label: "VISITS ALLOWED",
                    field: "visitsAllowed",
                    sort: "asc",
                    width: 100,
                },
                {
                    label: "VISITS USED",
                    field: "visitsUsed",
                    sort: "asc",
                    width: 100,
                },
                {
                    label: "VISITS REMAINING",
                    field: "visitsRemaining",
                    sort: "asc",
                    width: 100,
                },
                {
                    label: "START DATE",
                    field: "startDate",
                    sort: "asc",
                    width: 100,
                },

                {
                    label: "END DATE",
                    field: "expiryDate",
                    sort: "asc",
                    width: 100,
                },
            ],
            rows: this.state.AccountAuth,
        };
        var Range0_30 = this.state.agingData[0];
        //Loader Icon
        var loaderIcon = (
            <div class="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );

        let CpLoader = "";
        if (this.state.loading == true) {
            CpLoader = loaderIcon;
        }

        let billingSummeryLoader1 = this.state.billingSummeryLoader1
            ? loaderIcon
            : null;
        let billingSummeryLoader2 = this.state.billingSummeryLoader2
            ? loaderIcon
            : null;
        let billingSummeryLoader3 = this.state.billingSummeryLoader3
            ? loaderIcon
            : null;
        let loader1 = this.state.loader1 ? loaderIcon : null;
        let loader2 = this.state.loader2 ? loaderIcon : null;
        let loader3 = this.state.loader3 ? loaderIcon : null;
        let loader4 = this.state.loader4 ? loaderIcon : null;
        let loader5 = this.state.loader5 ? loaderIcon : null;
        let loader6 = this.state.loader6 ? loaderIcon : null;

        var payer1 = "";
        var payer2 = "";
        var payer3 = "";
        var payer4 = "";
        var payer5 = "";
        var payer6 = "";
        var payer7 = "";
        var payer8 = "";
        var payer9 = "";
        var payer10 = "";

        try {
            if (this.state.PaiChartData.length > 0) {
                payer1 = this.state.PaiChartData[0].name;
                payer2 = this.state.PaiChartData[1].name;
                payer3 = this.state.PaiChartData[2].name;
                payer4 = this.state.PaiChartData[3].name;
                payer5 = this.state.PaiChartData[4].name;
                payer6 = this.state.PaiChartData[5].name;
                payer7 = this.state.PaiChartData[6].name;
                payer8 = this.state.PaiChartData[7].name;
                payer9 = this.state.PaiChartData[8].name;
                payer10 = this.state.PaiChartData[9].name;
            }
        } catch { }
        var payer1Count = "";
        var payer2Count = "";
        var payer3Count = "";
        var payer4Count = "";
        var payer5Count = "";
        var payer6Count = "";
        var payer7Count = "";
        var payer8Count = "";
        var payer9Count = "";
        var payer10Count = "";
        try {
            if (this.state.PaiChartData.length > 0) {
                payer1Count = this.convertNumber(this.state.PaiChartData[0].count);
                // this.state.PaiChartData[0].count.toLocaleString(undefined, {maximumFractionDigits:2});s
                payer2Count = this.convertNumber(this.state.PaiChartData[1].count);
                payer3Count = this.convertNumber(this.state.PaiChartData[2].count);
                payer4Count = this.convertNumber(this.state.PaiChartData[3].count);
                payer5Count = this.convertNumber(this.state.PaiChartData[4].count);
                payer6Count = this.convertNumber(this.state.PaiChartData[5].count);
                payer7Count = this.convertNumber(this.state.PaiChartData[6].count);
                payer8Count = this.convertNumber(this.state.PaiChartData[7].count);
                payer9Count = this.convertNumber(this.state.PaiChartData[8].count);
                payer10Count = this.convertNumber(this.state.PaiChartData[9].count);
            }
        } catch { }

        var reason1 = "";
        var reason2 = "";
        var reason3 = "";
        var reason4 = "";
        var reason5 = "";
        var reason6 = "";
        try {
            if (this.state.FollowUpChart.length > 0) {
                reason1 = this.state.FollowUpChart[0].name;
                reason2 = this.state.FollowUpChart[1].name;
                reason3 = this.state.FollowUpChart[2].name;
                reason4 = this.state.FollowUpChart[3].name;
                reason5 = this.state.FollowUpChart[4].name;
                reason6 = this.state.FollowUpChart[5].name;
            }
        } catch { }
        var reason1VisitCount = "";
        var reason2VisitCount = "";
        var reason3VisitCount = "";
        var reason4VisitCount = "";
        var reason5VisitCount = "";
        var reason6VisitCount = "";
        try {
            if (this.state.FollowUpChart.length > 0) {
                reason1VisitCount = this.convertNumber(
                    this.state.FollowUpChart[0].visitCount
                );
                reason2VisitCount = this.convertNumber(
                    this.state.FollowUpChart[1].visitCount
                );
                reason3VisitCount = this.convertNumber(
                    this.state.FollowUpChart[2].visitCount
                );
                reason4VisitCount = this.convertNumber(
                    this.state.FollowUpChart[3].visitCount
                );
                reason5VisitCount = this.convertNumber(
                    this.state.FollowUpChart[4].visitCount
                );
                reason6VisitCount = this.convertNumber(
                    this.state.FollowUpChart[5].visitCount
                );
            }
        } catch { }

        const data01 = [
            { name: "Group A", value: 400 },
            { name: "Group B", value: 300 },
            { name: "Group C", value: 300 },
            { name: "Group D", value: 200 },
            { name: "Group D", value: 200 },
            { name: "Group D", value: 200 },
            { name: "Group D", value: 200 },
            { name: "Group D", value: 200 },
            { name: "Group D", value: 200 },
        ];
        const data02 = [
            { name: "A1", count: 100 },
            { name: "A2", count: 300 },
            { name: "B1", count: 100 },
            { name: "B2", count: 80 },
            { name: "B3", count: 40 },
            { name: "B4", count: 30 },
            { name: "B5", count: 50 },
            { name: "C1", count: 100 },
            { name: "C2", count: 200 },
            { name: "D1", count: 150 },
            { name: "D2", count: 50 },
        ];

        const BiaAxialdata = [
            { name: "Page A", uv: 4000, pv: 2400, amt: 2400, bmt: 2000 },
            { name: "Page B", uv: 3000, pv: 1398, amt: 2210, bmt: 2100 },
            { name: "Page C", uv: 2000, pv: 9800, amt: 2290, bmt: 1800 },
            { name: "Page D", uv: 2780, pv: 3908, amt: 2000, bmt: 1500 },
            { name: "Page E", uv: 1890, pv: 4800, amt: 2181, bmt: 1000 },
            { name: "Page F", uv: 2390, pv: 3800, amt: 2500, bmt: 500 },
            { name: "Page G", uv: 3490, pv: 4300, amt: 2100, bmt: 2600 },
        ];

        const providerData = {
            columns: [
                {
                    label: "ID",
                    field: "Id",
                    sort: "asc",
                    width: 150,
                },
                {
                    label: "",
                    field: "name",
                    sort: "asc",
                    width: 150,
                },
                {
                    label: "0-30",
                    field: "30",
                    sort: "asc",
                    width: 150,
                },
                {
                    label: "30+ ",
                    field: "30+",
                    sort: "asc",
                    width: 150,
                },
                {
                    label: "60+",
                    field: "60+",
                    sort: "asc",
                    width: 150,
                },

                {
                    label: "90+",
                    field: "ssn",
                    sort: "asc",
                    width: 150,
                },
                {
                    label: "120+",
                    field: "texonomycode",
                    sort: "asc",
                    width: 150,
                },
                {
                    label: "Total",
                    field: "address",
                    sort: "asc",
                    width: 150,
                },
            ],
        };

        const data = [
            { name: "Page A", value: 4000 },
            { name: "Page B", value: 3000 },
            { name: "Page C", value: 2000 },
            { name: "Page C", value: 5000 },
            { name: "Page C", value: 3000 },
            { name: "Page C", value: 500 },
            { name: "Page C", value: 100 },
            { name: "Page C", value: 1000 },
        ];

        var ReasonData = [];
        this.state.FollowUpData.map((row) => {
            ReasonData.push(
                <tr>
                    <td></td>

                    <td>{row.reasonName}</td>
                    <td>{row.visitCount ? this.convertNumber(row.visitCount) : " "}</td>
                    <td>
                        {row.totalAmmount
                            ? "$" + this.convertNumber(row.totalAmmount)
                            : " "}
                    </td>
                </tr>
            );
        });

        var chargeTabledata = [];
        this.state.chargePaymentData.map((row) => {
            chargeTabledata.push(
                <tr>
                    <td></td>

                    <td>{row.yearMonth}</td>
                    <td>
                        {row.charge.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </td>
                    <td>
                        {row.planPayment.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </td>
                    <td>
                        {row.patientPaid.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </td>
                    <td>
                        {row.adjustments.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </td>
                    <td>
                        {row.planBal.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </td>
                    <td>
                        {row.patBal.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </td>
                    <td>
                        {row.totalBal.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </td>
                </tr>
            );
        });

        var tableDataList = [];
        this.state.agingData.map((row) => {
            tableDataList.push(
                <tr>
                    <td></td>
                    <td>{row.name}</td>
                    <td>
                        {row.range0_30.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </td>
                    <td>
                        {row.range31_60.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </td>
                    <td>
                        {row.range61_90.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </td>
                    <td>
                        {row.range91_120.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </td>
                    <td>
                        {row.range120plus.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </td>
                    <td>
                        {row.total.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </td>
                </tr>
            );
        });

        var submitDate = momentTZ().tz("America/Los_Angeles").format();
        submitDate = submitDate.slice(0, 10);

        var entryDateFrom = momentTZ().tz("America/Los_Angeles").format();
        entryDateFrom = entryDateFrom.slice(0, 10);

        return (
            <React.Fragment>
                {/* {spiner} */}
                {/* {this.state.landingPage == false ? ( */}
                <div className="row" id="body-row-mt118">
                    <div className="col-lg-12">
                        <div className="mf-12 bg-skyblue">
                            <div
                                className="row-form providerDashboard"
                                style={{ overflow: "hidden" }}
                            >
                                <div className="mf-9">
                                    <h2> Dashboard</h2>
                                </div>
                                <div className="mf-3">
                                    <img
                                        style={{ marginLeft: "79%", marginTop: "5%" }}
                                        src={settingIcon}
                                        onClick={() => this.refreshDashboard()}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mainTable fullWidthDasboardTable appointmentsSummary">
                            <div className="row-form row-form-ov mt-15">
                                <div className="mf-12 batchContainer pb-20">
                                    <div className="row-form" style={{ overflow: "visible" }}>
                                        <div className="mf-8">
                                            <h2>Appointments Summary</h2>
                                        </div>
                                        <div className="col-md-4 headingRight">
                                            <select
                                                name="value"
                                                class="TodayselectDropDown"
                                                onChange={this.handleChange}
                                                value={this.state.AppointmentSummeryModel.value}
                                            >
                                                <option value="T">Today</option>
                                                <option value="Y">Yesterday</option>
                                                <option value="MTD">Month to Date</option>
                                                <option value="YTD">Year to Date</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row-form row-form-ov">
                                        <div
                                            className="mf-2 appointmentsBox bg-green text-center"
                                            style={{ width: "12%" }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <p className="appointmentparagraph">SCHEDULED</p>
                                                <h3 className="appointmentHeading">
                                                    {this.state.scheduled}
                                                </h3>
                                            </div>
                                        </div>

                                        <div
                                            className="mf-2 appointmentsBox text-center ml-25"
                                            style={{ width: "12%", backgroundColor: "#D2691E" }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <p className="appointmentparagraph">CHECK IN</p>
                                                <h3 className="appointmentHeading">
                                                    {this.state.checkIN ? this.state.checkIN : "0"}
                                                </h3>
                                            </div>
                                        </div>

                                        <div
                                            className="mf-2 appointmentsBox text-center ml-25"
                                            style={{ width: "12%", backgroundColor: "#A52A2A" }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <p className="appointmentparagraph">CHECK OUT</p>
                                                <h3 className="appointmentHeading">
                                                    {this.state.checkOut ? this.state.checkOut : "0"}
                                                </h3>
                                            </div>
                                        </div>

                                        <div
                                            className="mf-2 appointmentsBox bg-blue text-center ml-25"
                                            style={{ width: "12%" }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <p className="appointmentparagraph">CONFIRMED</p>
                                                <h3 className="appointmentHeading">
                                                    {this.state.confirmed}
                                                </h3>
                                            </div>
                                        </div>

                                        <div
                                            className="mf-2 appointmentsBox bg-grey text-center ml-25"
                                            style={{ width: "12%" }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <p className="appointmentparagraph">NO SHOW</p>
                                                <h3 className="appointmentHeading">
                                                    {this.state.noShow}
                                                </h3>
                                            </div>
                                        </div>

                                        <div
                                            className="mf-2 appointmentsBox bg-pink text-center ml-25"
                                            style={{ width: "12%" }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <p className="appointmentparagraph">CANCELLED</p>
                                                <h3 className="appointmentHeading">
                                                    {this.state.cancelled}
                                                </h3>
                                            </div>
                                        </div>

                                        <div
                                            className="mf-2 appointmentsBox bg-orange text-center ml-25"
                                            style={{ width: "12%" }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <p className="appointmentparagraph">RESCHEDULED</p>
                                                <h3 className="appointmentHeading">
                                                    {this.state.rescheduled}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row-form row-form-ov "></div>
                        </div>
                    </div>
                </div>
                {/* ) : ( */}
                <div>
                    <div className="row" id="body-row-mt118">
                        <div className="col py-3">
                            {/* <div className="mf-12 bg-skyblue">
                  <div
                    className="row-form providerDashboard"
                    style={{ overflow: "hidden" }}
                  >
                    <div className="mf-12">
                      <h2>Billing Dashboard</h2>
                    </div>
                  </div>
                </div> */}

                            <div className="mainTable fullWidthTable billingDashboard">
                                <div className="row-form row-form-ov  row-space-between">
                                    <div class="mf-4 batchContainer bg-skyblue p-10">
                                        <div className="row-form ">
                                            <div
                                                className="mf-12"
                                                style={{
                                                    display: "flex",
                                                    width: "100%",
                                                    height: "35px",
                                                    maxHeight: "35px",
                                                }}
                                            >
                                                <div style={{ width: "85%" }}>
                                                    <h4>Claims & ERAs</h4>
                                                </div>
                                                <div style={{ width: "25%", textAlign: "right" }}>
                                                    <span>
                                                        {billingSummeryLoader1}
                                                        {/* SAQIB */}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mf-12">
                                                <p>
                                                    <span className="billingSpan">
                                                        <Link
                                                            to={{
                                                                pathname: `/Paper Submission`,
                                                                query: {
                                                                    formType: "HCFA 1500",
                                                                },
                                                            }}
                                                        >
                                                            {this.props.billingClaims.length == 0 ? this.state.paperSubmission = 0 : this.state.paperSubmission}P/
                                                        </Link>
                                                        <Link
                                                            to={{
                                                                pathname: `/Electronic Submission`,
                                                                query: {
                                                                    receiverID: "1",
                                                                },
                                                            }}
                                                        >
                                                            {this.props.billingClaims.length == 0 ? this.state.electronicSubmission = 0 : this.state.electronicSubmission}E
                                                        </Link>
                                                    </span>
                                                    <strong> Ready for Submission</strong>
                                                </p>
                                                <p>
                                                    <span>
                                                        <Link
                                                            to={{
                                                                pathname: `/charges`,
                                                                query: { status: "R" },
                                                            }}
                                                        >
                                                            {this.props.billingClaims.length == 0 ? this.state.clameReject = 0 : this.state.clameReject}
                                                        </Link>
                                                    </span>

                                                    <strong> Claims Rejected</strong>
                                                </p>
                                                <p>
                                                    <span>
                                                        <Link
                                                            to={{
                                                                pathname: `/charges`,
                                                            }}
                                                        >
                                                            {this.props.billingClaims.length == 0 ? this.state.systemReject = 0 : this.state.systemReject}
                                                        </Link>
                                                    </span>{" "}
                                                    <strong> System Rejected</strong>{" "}
                                                </p>
                                                <p>
                                                    <span>
                                                        <Link
                                                            to={{
                                                                pathname: `/charges`,
                                                                query: { status: "DN" },
                                                            }}
                                                        >
                                                            {this.props.billingClaims.length == 0 ? this.state.clameDenied = 0 : this.state.clameDenied}
                                                        </Link>
                                                    </span>{" "}
                                                    <strong> Claims Denied</strong>
                                                </p>
                                                <p>
                                                    <span>
                                                        <Link
                                                            to={{
                                                                pathname: `/Payments`,
                                                                query: { status: "NP" },
                                                            }}
                                                        >
                                                            {this.props.billingClaims.length == 0 ? this.state.eraNeedPosting = 0 : this.state.eraNeedPosting}
                                                        </Link>
                                                    </span>{" "}
                                                    <strong> ERAs Need Posting</strong>{" "}
                                                </p>
                                                <p>
                                                    <span>
                                                        <Link
                                                            to={{
                                                                pathname: `/Payments`,
                                                                query: { status: "F" },
                                                            }}
                                                        >
                                                            {this.props.billingClaims.length == 0 ? this.state.eraFailed = 0 : this.state.eraFailed}
                                                        </Link>
                                                    </span>{" "}
                                                    <strong> ERAs Failed</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mf-4 batchContainer bg-skyblue p-10">
                                        <div className="row-form row-form-ov">
                                            <div
                                                className="mf-12"
                                                style={{
                                                    display: "flex",
                                                    width: "100%",
                                                    height: "35px",
                                                    maxHeight: "35px",
                                                }}
                                            >
                                                <div style={{ width: "85%" }}>
                                                    <h4>Followup & Others</h4>
                                                </div>
                                                <div style={{ width: "25%", textAlign: "right" }}>
                                                    <span>
                                                        {billingSummeryLoader2}
                                                        {/* SAQIB */}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mf-12">
                                                <p>
                                                    <span>
                                                        <Link
                                                            to={{
                                                                pathname: `/Plan Follow Up`,
                                                                query: { status: true },
                                                            }}
                                                        >
                                                            {this.props.billingFollowup.length == 0 ? this.state.planeFollowUp = 0 : this.state.planeFollowUp}
                                                        </Link>
                                                    </span>{" "}
                                                    <strong> Plan Followup</strong>{" "}
                                                </p>
                                                <p>
                                                    <span>
                                                        <Link
                                                            to={{
                                                                pathname: `/Patient Follow Up`,
                                                                query: { status: true },
                                                            }}
                                                        >
                                                            {this.props.billingFollowup.length == 0 ? this.state.patientFollowUp = 0 : this.state.patientFollowUp}
                                                        </Link>
                                                    </span>{" "}
                                                    <strong> Patients Followup</strong>{" "}
                                                </p>
                                                <p>
                                                    <span>
                                                        <Link
                                                            to={{
                                                                pathname: `/Patient Follow Up`,
                                                                query: { status: true },
                                                            }}
                                                        >
                                                            0
                                                        </Link>
                                                    </span>{" "}
                                                    <strong> Patient Statement</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mf-4 batchContainer bg-skyblue p-10">
                                        <div className="row-form row-form-ov">
                                            <div
                                                className="mf-12"
                                                style={{
                                                    display: "flex",
                                                    width: "100%",
                                                    height: "35px",
                                                    maxHeight: "35px",
                                                }}
                                            >
                                                <div style={{ width: "85%" }}>
                                                    <h4>Daily Summary</h4>
                                                </div>
                                                <div style={{ width: "25%", textAlign: "right" }}>
                                                    <span>
                                                        {billingSummeryLoader3}
                                                        {/* SAQIB */}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mf-12">
                                                <p>
                                                    <span>
                                                        <Link
                                                            to={{
                                                                pathname: `/Submission Log`,
                                                                query: {
                                                                    submitDate: submitDate,
                                                                },
                                                            }}
                                                        >
                                                            {this.props.billingDailySummary.length == 0 ? this.state.claimSubmitedDaily = 0 : this.state.claimSubmitedDaily}
                                                        </Link>
                                                    </span>{" "}
                                                    <strong> Claims Submitted</strong>
                                                </p>
                                                <p>
                                                    <span>
                                                        <Link
                                                            to={{
                                                                pathname: `Payments`,
                                                                query: {
                                                                    status: "A",
                                                                    entryDateFrom: entryDateFrom,
                                                                },
                                                            }}
                                                        >
                                                            {this.props.billingDailySummary.length == 0 ? this.state.paymentReceived = 0 : this.state.paymentReceived}
                                                        </Link>
                                                    </span>{" "}
                                                    <strong> Payments Recieved </strong>
                                                </p>
                                                <p>
                                                    <span>
                                                        <Link
                                                            to={{
                                                                pathname: `Payments`,
                                                                query: {
                                                                    status: "P",
                                                                    entryDateFrom: entryDateFrom,
                                                                },
                                                            }}
                                                        >
                                                            {this.props.billingDailySummary.length == 0 ? this.state.checkPosted = 0 : this.state.checkPosted}
                                                        </Link>
                                                    </span>{" "}
                                                    <strong> Checks Posted </strong>
                                                </p>
                                                <p>
                                                    <span>
                                                        <Link
                                                            to={{
                                                                pathname: `/charges`,
                                                                query: {
                                                                    isSubmitted: "Y",
                                                                    entryDateFrom: entryDateFrom,
                                                                },
                                                            }}
                                                        >
                                                            {this.props.billingDailySummary.length == 0 ? this.state.claimEntered = 0 : this.state.claimEntered}
                                                        </Link>
                                                    </span>
                                                    <strong> Claims Entered </strong>
                                                </p>
                                                <p>
                                                    <span>
                                                        <Link
                                                            to={{
                                                                pathname: `/Plan Follow Up`,
                                                                query: {
                                                                    submitDate: submitDate,
                                                                },
                                                            }}
                                                        >
                                                            {this.props.billingDailySummary.length == 0 ? this.state.planeFollowUpDaily = 0 : this.state.planeFollowUpDaily}
                                                        </Link>
                                                    </span>
                                                    <strong> Followup Created</strong>
                                                </p>
                                                <p>
                                                    <span>
                                                        <Link
                                                            to={{
                                                                pathname: `/Payments`,
                                                                query: {
                                                                    status: "F",
                                                                    entryDateFrom: entryDateFrom,
                                                                },
                                                            }}
                                                        >
                                                            {this.props.billingDailySummary.length == 0 ? this.state.eraFailedDaily = 0 : this.state.eraFailedDaily}
                                                        </Link>
                                                    </span>
                                                    <strong> Failed ERAs</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-form mt-25 row-form-ov row-space-between">
                                    <div className="mf-4 "></div>
                                    <div className="mf-4 "></div>

                                    <div className="mf-4 ">
                                        <div className="col-md-4 DosSelection">
                                            <select
                                                className="DOSselectDropDown"
                                                name="value"
                                                onChange={this.DosHandleChange}
                                                value={this.state.DosModel.value}
                                            >
                                                <option value="DOS">Date of Service</option>
                                                <option value="AD">Entry Date</option>
                                                <option value="SD">Submit Date</option>
                                                <option value="PD">Posted Date</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row-form mt-25 row-form-ov row-space-between">
                                    <div className="mf-6 batchContainer">
                                        <div className="row-form">
                                            <div className="mf-8 ">
                                                <h2>Visit & Charges Summary Graph</h2>
                                            </div>
                                            <div
                                                className="mf-2"
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    width: "22%",
                                                    // justifyContent: "space-between"
                                                }}
                                            >
                                                <p className="checkBoxHheading">
                                                    {this.state.pageToLoad == false
                                                        ? "Visits"
                                                        : "Charges"}
                                                </p>

                                                <div
                                                    className="lblChkBox"
                                                    onChange={this.handleCheckSubmission}
                                                    style={{ padding: "20px 0px 0px 15px" }}
                                                >
                                                    <input
                                                        id="visitsCheckbox"
                                                        type="checkbox"
                                                        checked={this.state.pageToLoad}
                                                        onChange={this.handleCheckSubmission}
                                                    />
                                                    <label for="visitsCheckbox"></label>
                                                </div>

                                                {/* <input
                          className="GraphcheckBox"
                          type="checkbox"
                          id="pageToLoad"
                          name="pageToLoad"
                          checked={this.state.pageToLoad}
                          onChange={this.handleCheckSubmission}
                        /> */}
                                            </div>
                                            <div
                                                className="mf-2"
                                                style={{
                                                    textAlign: "right",
                                                    paddingTop: "2%",
                                                    paddingRight: "1%",
                                                }}
                                            >
                                                {loader2}
                                            </div>
                                        </div>

                                        <div
                                            className="chartContainer"
                                            style={{ marginTop: "20%" }}
                                        >
                                            {this.state.pageToLoad == false ? (
                                                <ResponsiveContainer width="100%" height={200}>
                                                    <BarChart
                                                        data={this.props.visitCharge.length == 0 ? this.state.visitSummeryData = [] : this.state.visitSummeryData}
                                                        margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                                                    >
                                                        <XAxis dataKey="yearMonth" interval={0} />
                                                        <YAxis interval="preserveStart" dataKey="count" />
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Bar
                                                            dataKey="count"
                                                            stackId="count"
                                                            fill="#3367d6"
                                                            barSize={20}
                                                        />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            ) : (
                                                <ResponsiveContainer width="100%" height={200}>
                                                    <BarChart
                                                        data={this.props.visitCharge.length == 0 ? this.state.visitSummeryData = [] : this.state.visitSummeryData}
                                                        margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
                                                    >
                                                        <XAxis dataKey="yearMonth" interval={0} />
                                                        <YAxis interval={1} dataKey="charges" />
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Bar
                                                            dataKey="charges"
                                                            // stackId="charges"
                                                            fill="#3367d6"
                                                            barSize={20}
                                                        />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mf-6 batchContainer">
                                        <div style={{ display: "flex", width: "100%" }}>
                                            <h2>Top Payers</h2>
                                            <h2 style={{ textAlign: "right" }}>{loader3}</h2>
                                        </div>
                                        <div className="chartContainer">
                                            <div className="flexPayer">
                                                <div className="PayerSummery">
                                                    {payer1.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="blueBox"></div>

                                                            <span style={{ width: "60%" }}>{payer1}</span>
                                                            <span style={{ fontWeight: "bold" }}>
                                                                {payer1Count}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {payer2.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="yellowBox"></div>
                                                            <span style={{ width: "60%" }}>{payer2}</span>
                                                            <span style={{ fontWeight: "bold" }}>
                                                                {payer2Count}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {payer3.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="GreenBox"></div>
                                                            <span style={{ width: "60%" }}>{payer3}</span>
                                                            <span style={{ fontWeight: "bold" }}>
                                                                {payer3Count}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {payer4.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="orangeBox"></div>
                                                            <span style={{ width: "60%" }}>{payer4}</span>
                                                            <span style={{ fontWeight: "bold" }}>
                                                                {payer4Count}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {payer5.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="purpleBox"></div>
                                                            <span style={{ width: "60%" }}>{payer5}</span>
                                                            <span style={{ fontWeight: "bold" }}>
                                                                {payer5Count}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {payer6.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="brownBox"></div>
                                                            <span style={{ width: "60%" }}>{payer6}</span>
                                                            <span style={{ fontWeight: "bold" }}>
                                                                {payer6Count}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {payer7.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="blackBox"></div>
                                                            <span style={{ width: "60%" }}>{payer7}</span>
                                                            <span style={{ fontWeight: "bold" }}>
                                                                {payer7Count}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {payer8.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="DarkGreenBox"></div>
                                                            <span style={{ width: "60%" }}>{payer8}</span>
                                                            <span style={{ fontWeight: "bold" }}>
                                                                {payer8Count}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {payer9.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="lightBrown"></div>
                                                            <span style={{ width: "60%" }}>{payer9}</span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {payer10.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="gradientBox"></div>
                                                            <span style={{ width: "60%" }}>{payer10}</span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    <br />
                                                </div>

                                                {/* {console.log(">>>>>>>>>>>",this.state.paiChartdata)} */}
                                                <div className="PayerGraph">
                                                    <ResponsiveContainer
                                                        width="100%"
                                                        height={300}
                                                        style={{ marginTop: "60px" }}
                                                        className="paiChartContainer"
                                                    >
                                                        <PieChart>
                                                            <Pie
                                                                dataKey="count"
                                                                data={this.props.topPayer.length == 0 ? this.state.PaiChartData = [] : this.state.PaiChartData}
                                                                // data={this.state.PaiChartData}
                                                                cx="30%"
                                                                cy="50%"
                                                                outerRadius={80}
                                                                innerRadius={0}
                                                                intervals={0}
                                                                labelLine={false}
                                                                label={renderCustomizedLabel}
                                                            >
                                                                {data.map((entry, index) => (
                                                                    <Cell
                                                                        key={index}
                                                                        fill={COLORS[index % COLORS.length]}
                                                                    />
                                                                ))}
                                                            </Pie>

                                                            <Tooltip />
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-form mt-25 row-form-ov row-space-between">
                                    <div className="mf-6 batchContainer">
                                        <div style={{ display: "flex", width: "100%" }}>
                                            <h2>
                                                Practice Analysis Record Graph{" "}
                                                <span style={{ fontSize: "14px" }}>Last 6 Months</span>{" "}
                                            </h2>
                                            <h2 style={{ textAlign: "right" }}>{loader4}</h2>
                                        </div>
                                        <div
                                            className="chartContainer"
                                            style={{ marginTop: "12%" }}
                                        >
                                            <ResponsiveContainer width="100%" height={200}>
                                                <BarChart
                                                    data={this.props.practiceAnalysis.length == 0 ? this.state.chargePaymentData = [] : this.state.chargePaymentData}
                                                    margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
                                                    offset="6"
                                                >
                                                    <XAxis dataKey="yearMonth" interval={0} />
                                                    <YAxis interval={0} dataKey="charge" />

                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="charge" fill="#4081FE" barSize={20} />
                                                    <Bar dataKey="payment" fill="#ffc658" barSize={20} />
                                                    <Bar
                                                        dataKey="adjustments"
                                                        fill="#008890"
                                                        barSize={20}
                                                    />
                                                    <Bar dataKey="planBal" fill="#ED9331" barSize={20} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                    <div className="mf-6 tableContainer text-nowrap">
                                        <div style={{ display: "flex", width: "100%" }}>
                                            <h2>Practice Analysis Record Table</h2>
                                            <h2 style={{ textAlign: "right" }}>{loader4}</h2>
                                        </div>
                                        <div>
                                            <table className="table table-striped table-bordered text-nowrap">
                                                <thead>
                                                    <tr role="row">
                                                        <th className="sorting_asc"> </th>
                                                        <th className="" style={{ width: "90px" }}>
                                                            {" "}
                                                            MONTH
                                                        </th>
                                                        <th className="" style={{ width: "100px" }}>
                                                            {" "}
                                                            <b>($)</b>
                                                            CHARGES
                                                        </th>
                                                        <th className="" style={{ width: "98px" }}>
                                                            {" "}
                                                            <b>($)</b>
                                                            PLAN PAYMENT
                                                        </th>
                                                        {/* <th class="sorting"  style={{width: "133px"}}">30+</th> */}
                                                        <th className="" style={{ width: "130px" }}>
                                                            <b>($)</b>
                                                            PT PAYMENT
                                                        </th>
                                                        <th className="" style={{ width: "133px" }}>
                                                            {" "}
                                                            <b>($)</b>
                                                            ADJUSTMENT
                                                        </th>
                                                        <th className="" style={{ width: "144px" }}>
                                                            {" "}
                                                            <b>($)</b>
                                                            PLAN BALANCE
                                                        </th>
                                                        <th className="" style={{ width: "144px" }}>
                                                            {" "}
                                                            <b>($)</b>
                                                            PT BALANCE
                                                        </th>
                                                        <th className="" style={{ width: "144px" }}>
                                                            {" "}
                                                            <b>($)</b>
                                                            TOTAL BALANCE
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>{this.props.practiceAnalysis.length == 0 ? chargeTabledata = [] : chargeTabledata}</tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="row-form mt-25 row-form-ov row-space-between">
                                    <div className="mf-6 batchContainer">
                                        <div style={{ display: "flex", width: "100%" }}>
                                            <h2>Plan Follow up</h2>
                                            <h2 style={{ textAlign: "right" }}>{loader5}</h2>
                                        </div>

                                        <div className="chartContainer">
                                            <div className="flexPayer">
                                                <div className="PayerSummery">
                                                    {reason1.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="blueBox"></div>

                                                            <span style={{ width: "40%" }}>{reason1}</span>
                                                            <span style={{ fontWeight: "bold" }}>
                                                                {reason1VisitCount}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {reason2.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="yellowBox"></div>
                                                            <span style={{ width: "40%" }}>{reason2}</span>
                                                            <span style={{ fontWeight: "bold" }}>
                                                                {reason2VisitCount}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {reason3.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="GreenBox"></div>
                                                            <span style={{ width: "40%" }}>{reason3}</span>
                                                            <span style={{ fontWeight: "bold" }}>
                                                                {reason3VisitCount}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {reason4.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="orangeBox"></div>
                                                            <span style={{ width: "40%" }}>{reason4}</span>
                                                            <span style={{ fontWeight: "bold" }}>
                                                                {reason4VisitCount}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {reason5.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="purpleBox"></div>
                                                            <span style={{ width: "40%" }}>{reason5}</span>
                                                            <span style={{ fontWeight: "bold" }}>
                                                                {reason5VisitCount}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {reason6.length > 0 ? (
                                                        <div
                                                            style={{
                                                                marginTop: "10px",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            }}
                                                        >
                                                            <div className="brownBox"></div>
                                                            <span style={{ width: "40%" }}>{reason6}</span>
                                                            <span style={{ fontWeight: "bold" }}>
                                                                {reason6VisitCount}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    <br />
                                                </div>
                                                <div className="PayerGraph">
                                                    <ResponsiveContainer
                                                        width="100%"
                                                        height={300}
                                                        style={{ marginTop: "60px" }}
                                                        className="paiChartContainer"
                                                    >
                                                        <PieChart>
                                                            <Pie
                                                                dataKey="visitCount"
                                                                data={this.props.planFollowUp.length == 0 ? this.state.FollowUpChart = [] : this.state.FollowUpChart}
                                                                cx="35%"
                                                                cy="50%"
                                                                outerRadius={80}
                                                                innerRadius={0}
                                                                // fill="#3367d6"
                                                                labelLine={false}
                                                                label={renderCustomizedFollowupLabel}
                                                            >
                                                                {data.map((entry, index) => (
                                                                    <Cell
                                                                        key={index}
                                                                        fill={COLORS[index % COLORS.length]}
                                                                    />
                                                                ))}
                                                            </Pie>

                                                            <Tooltip />
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mf-6 tableContainer">
                                        <h2>Plan Follow up Table</h2>
                                        <div>
                                            <table className="table table-striped table-bordered">
                                                <thead>
                                                    <tr role="row">
                                                        <th> </th>

                                                        <th className="" style={{ width: "98px" }}>
                                                            {" "}
                                                            REASON
                                                        </th>
                                                        <th className="" style={{ width: "98px" }}>
                                                            {" "}
                                                            VISIT
                                                        </th>
                                                        <th className="" style={{ width: "98px" }}>
                                                            {" "}
                                                            <b>($)</b>
                                                            AMOUNT
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>{this.props.planFollowUp.length == 0 ? ReasonData = [] : ReasonData}</tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-form mt-25 row-form-ov row-space-between">
                                    <div className="mf-6 batchContainer">
                                        <div style={{ display: "flex", width: "100%" }}>
                                            <h2>Aging Summary Graph</h2>
                                            <h2 style={{ textAlign: "right" }}>{loader6}</h2>
                                        </div>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <BarChart
                                                data={this.props.agingData.length == 0 ? this.state.agingData = [] : this.state.agingData}
                                                margin={{ top: 10, right: 0, left: 10, bottom: 0 }}
                                                offset="6"
                                            >
                                                <XAxis interval={0} dataKey="name" />
                                                <YAxis interval={0} dataKey="total" />

                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="range0_30" fill="#4081FE" barSize={20} />
                                                <Bar dataKey="range31_60" fill="#ffc658" barSize={20} />
                                                <Bar dataKey="range61_90" fill="#008890" barSize={20} />
                                                <Bar
                                                    dataKey="range91_120"
                                                    fill="#ED9331"
                                                    barSize={20}
                                                />
                                                <Bar
                                                    dataKey="range120plus"
                                                    fill="#00bcd4"
                                                    barSize={20}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mf-6  tableContainer text-nowrap">
                                        <div style={{ display: "flex", width: "100%" }}>
                                            <h2>Aging Summary</h2>
                                            <h2 style={{ textAlign: "right" }}>{loader6}</h2>
                                        </div>
                                        <table className="table table-striped table-bordered text-nowrap">
                                            <thead>
                                                <tr role="row">
                                                    <th></th>
                                                    <th
                                                        className="sorting_asc"
                                                        style={{ width: "110px" }}
                                                    >
                                                        &nbsp;{" "}
                                                    </th>
                                                    <th style={{ width: "98px" }}>
                                                        {" "}
                                                        <b>($)</b>
                                                        CURRRENT
                                                    </th>
                                                    <th style={{ width: "133px" }}>
                                                        <b>($)</b>
                                                        31-60
                                                    </th>
                                                    <th style={{ width: "133px" }}>
                                                        <b>($)</b>
                                                        61-90
                                                    </th>
                                                    <th style={{ width: "133px" }}>
                                                        {" "}
                                                        <b>($)</b>
                                                        91-120
                                                    </th>
                                                    <th style={{ width: "144px" }}>
                                                        {" "}
                                                        <b>($)</b>
                                                        120+
                                                    </th>
                                                    <th style={{ width: "119px" }}>
                                                        <b>($)</b>
                                                        TOTAL
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>{this.props.agingData.length == 0 ? tableDataList = [] : tableDataList}</tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="mf-12 table-grid mt-15">
                                    <GridHeading
                                        Heading="Expiring Patient Authorizations"
                                        dataObj={this.state.searchModel}
                                        url={this.url}
                                        methodName="ExportSimple"
                                        methodNamePdf="ExportSimplePdf"
                                        length={this.state.data.length}
                                    ></GridHeading>

                                    <div>
                                        <div className="tableGridContainer text-nowrap">
                                            <MDBDataTable
                                                striped
                                                searching={false}
                                                data={AccountAuth}
                                                displayEntries={false}
                                                sortable={true}
                                                scrollX={false}
                                                scrollY={false}
                                                responsive={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {popup}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        // cptCodes : state.loginInfo ? (state.loginInfo.cpt ? state.loginInfo.cpt : []):[],
        // icdCodes : state.loginInfo ? (state.loginInfo.icd ? state.loginInfo.icd : []):[],
        cptCodes: state.loginInfo
            ? state.loginInfo.cpt
                ? state.loginInfo.cpt
                : []
            : [],
        billingClaims: state.BillingClaimReducer ? state.BillingClaimReducer : [],
        billingFollowup: state.BillingFollowReducer
            ? state.BillingFollowReducer
            : [],
        billingDailySummary: state.BillingDailySummaryReducer
            ? state.BillingDailySummaryReducer
            : [],
        visitCharge: state.VisitChargeDataReducer
            ? state.VisitChargeDataReducer
            : [],
        topPayer: state.TopPayerReducer ? state.TopPayerReducer : [],
        practiceAnalysis: state.PracticeAnalysisReducer
            ? state.PracticeAnalysisReducer
            : [],
        planFollowUp: state.PlanFollowupReducer ? state.PlanFollowupReducer : [],
        agingData: state.AgingDataReducer ? state.AgingDataReducer : [],
        refreshDashboard: state.RefreshDashboard ? state.RefreshDashboard : false,

        icdCodes: state.loginInfo
            ? state.loginInfo.icd
                ? state.loginInfo.icd
                : []
            : [],
        selectedTab:
            state.selectedTab !== null ? state.selectedTab.selectedTab : "",
        selectedTabPage: state.selectedTabPage,
        selectedPopup: state.selectedPopup,
        id: state.selectedTab !== null ? state.selectedTab.id : 0,
        setupLeftMenu: state.leftNavigationMenus,
        loginObject: state.loginToken
            ? state.loginToken
            : { toekn: "", isLogin: false },
        userInfo1: state.loginInfo
            ? state.loginInfo
            : { userPractices: [], name: "", practiceID: null },
        taxonomyCode: state.loginInfo
            ? state.loginInfo.taxonomy
                ? state.loginInfo.taxonomy
                : []
            : [],
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            selectTabPageAction: selectTabPageAction,
            loginAction: loginAction,
            selectTabAction: selectTabAction,
            userInfo: userInfo,
            setICDAction: setICDAction,
            setCPTAction: setCPTAction,
            taxonomyCodeAction: taxonomyCodeAction,
            setInsurancePlans: setInsurancePlans,
            setReceiver: setReceiverAction,
            setAdjustmentCode: setAdjustmentCodeAction,
            setRemarkCode: setRemarkCodeAction,
            BillingClaimAction: BillingClaimAction,
            BillingFollowAction: BillingFollowAction,
            BillingDailySummaryAction: BillingDailySummaryAction,
            VisitChargeDataAction: VisitChargeDataAction,
            TopPayerAction: TopPayerAction,
            PracticeAnalysisAction: PracticeAnalysisAction,
            PlanFollowupAction: PlanFollowupAction,
            AgingDataAction: AgingDataAction,
            RefreshPageAction: RefreshPageAction,
        },
        dispatch
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);
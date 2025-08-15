import React, { useState, useEffect } from 'react';
import { 
  Shield, Upload, Users, FileText, CheckCircle, AlertTriangle, 
  Eye, Download, Share2, Clock, TrendingUp, Database, Lock,
  Network, Search, Filter, Bell, Settings, User, LogOut,
  ChevronRight, Play, Pause, RotateCcw, Zap, Globe, Key,
  Activity, BarChart3, PieChart, MapPin, Phone, Mail, Building
} from 'lucide-react';

const TrustGraphKYC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCase, setSelectedCase] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);
  const [riskScore, setRiskScore] = useState(0);
  const [graphData, setGraphData] = useState(null);
  const [verificationComplete, setVerificationComplete] = useState(false);
  
  // Mock data
  const mockCases = [
    {
      id: 1,
      companyName: "TechCorp Solutions Pvt Ltd",
      status: "REVIEW",
      riskScore: 75,
      lastUpdated: "2 hours ago",
      documents: ["GST Certificate", "PAN Card", "MOA", "AOA", "Director List"],
      flagReason: "Address mismatch + PEP connection detected"
    },
    {
      id: 2,
      companyName: "Green Energy India Ltd",
      status: "APPROVED",
      riskScore: 25,
      lastUpdated: "1 day ago",
      documents: ["GST Certificate", "PAN Card", "MOA"],
      flagReason: null
    },
    {
      id: 3,
      companyName: "Mumbai Trading Co",
      status: "REJECTED",
      riskScore: 95,
      lastUpdated: "3 hours ago",
      documents: ["GST Certificate", "PAN Card"],
      flagReason: "Sanctioned entity connection via beneficial owner"
    }
  ];

  const steps = [
    "Document Upload", "AI Processing", "Graph Analysis", 
    "Risk Assessment", "Blockchain Verification", "Report Generation"
  ];

  const processCase = async (caseData) => {
    setProcessing(true);
    setCurrentStep(0);
    
    // Simulate processing steps
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep(i + 1);
      if (i === 3) setRiskScore(caseData.riskScore);
      if (i === 2) setGraphData(generateMockGraph(caseData));
    }
    
    setVerificationComplete(true);
    setProcessing(false);
  };

  const generateMockGraph = (caseData) => ({
    nodes: [
      { id: 'company', label: caseData.companyName, type: 'company', risk: caseData.riskScore > 50 ? 'high' : 'low' },
      { id: 'director1', label: 'Rajesh Kumar', type: 'person', risk: 'medium' },
      { id: 'director2', label: 'Priya Sharma', type: 'person', risk: 'low' },
      { id: 'entity1', label: 'Shell Company Ltd', type: 'company', risk: 'high' },
      { id: 'sanctioned', label: 'Blacklisted Entity', type: 'sanctioned', risk: 'critical' }
    ],
    connections: [
      { from: 'company', to: 'director1', relation: 'Director 60%' },
      { from: 'company', to: 'director2', relation: 'Director 40%' },
      { from: 'director1', to: 'entity1', relation: 'Beneficial Owner' },
      { from: 'entity1', to: 'sanctioned', relation: 'Connected Entity' }
    ]
  });

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cases</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-600 ml-1">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-orange-600">23</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Auto-Approved</p>
              <p className="text-2xl font-bold text-green-600">1,156</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Process Time</p>
              <p className="text-2xl font-bold text-purple-600">4.2m</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Cases */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent KYC Cases</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockCases.map((case_) => (
              <div key={case_.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                   onClick={() => { setSelectedCase(case_); setActiveTab('verification'); }}>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{case_.companyName}</h4>
                    <p className="text-sm text-gray-500">{case_.flagReason || "Standard verification complete"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    case_.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    case_.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {case_.status}
                  </span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">Risk: {case_.riskScore}%</div>
                    <div className="text-xs text-gray-500">{case_.lastUpdated}</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const VerificationView = () => (
    <div className="space-y-6">
      {/* Case Selection or New Case */}
      {!selectedCase && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Start New KYC Verification</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Corporate Documents</h4>
            <p className="text-gray-500 mb-4">Drag and drop GST Certificate, PAN, MOA/AOA, Director List</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => processCase(mockCases[0])}>
              Select Demo Case
            </button>
          </div>
        </div>
      )}

      {/* Processing Steps */}
      {(processing || selectedCase) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedCase ? `Processing: ${selectedCase.companyName}` : 'KYC Verification Pipeline'}
            </h3>
            {processing && <div className="flex items-center space-x-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
              <span className="text-sm">Processing...</span>
            </div>}
          </div>
          
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step} className={`flex items-center space-x-4 p-4 rounded-lg ${
                index < currentStep ? 'bg-green-50 border-l-4 border-green-500' :
                index === currentStep && processing ? 'bg-blue-50 border-l-4 border-blue-500' :
                'bg-gray-50'
              }`}>
                <div className={`p-2 rounded-full ${
                  index < currentStep ? 'bg-green-100' :
                  index === currentStep && processing ? 'bg-blue-100' :
                  'bg-gray-100'
                }`}>
                  {index < currentStep ? 
                    <CheckCircle className="h-5 w-5 text-green-600" /> :
                    index === currentStep && processing ?
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div> :
                    <Clock className="h-5 w-5 text-gray-400" />
                  }
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{step}</h4>
                  {index === 0 && index <= currentStep && (
                    <p className="text-sm text-gray-600">GST Certificate, PAN, MOA/AOA analyzed</p>
                  )}
                  {index === 1 && index <= currentStep && (
                    <p className="text-sm text-gray-600">AI extracted 24 data points, normalized formats</p>
                  )}
                  {index === 2 && index <= currentStep && (
                    <p className="text-sm text-gray-600">Built trust graph with 5 entities, detected risk path</p>
                  )}
                  {index === 3 && index <= currentStep && (
                    <p className="text-sm text-gray-600">Risk score calculated: {riskScore}% - Manual review required</p>
                  )}
                  {index === 4 && index <= currentStep && (
                    <p className="text-sm text-gray-600">Verification steps recorded on blockchain with quantum-safe signatures</p>
                  )}
                  {index === 5 && index <= currentStep && (
                    <p className="text-sm text-gray-600">Comprehensive report generated with audit trail</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {verificationComplete && selectedCase && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trust Graph */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">TrustGraph Analysis</h3>
            <div className="relative bg-gray-50 rounded-lg p-6 h-80">
              <svg width="100%" height="100%" viewBox="0 0 400 300">
                {/* Connections */}
                <line x1="200" y1="150" x2="100" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="200" y1="150" x2="300" y2="80" stroke="#10b981" strokeWidth="2" />
                <line x1="100" y1="80" x2="50" y2="200" stroke="#f59e0b" strokeWidth="2" />
                <line x1="50" y1="200" x2="150" y2="250" stroke="#dc2626" strokeWidth="3" />
                
                {/* Nodes */}
                <circle cx="200" cy="150" r="25" fill="#3b82f6" />
                <text x="200" y="155" textAnchor="middle" className="fill-white text-xs font-medium">Company</text>
                
                <circle cx="100" cy="80" r="20" fill="#f59e0b" />
                <text x="100" y="85" textAnchor="middle" className="fill-white text-xs">Director</text>
                
                <circle cx="300" cy="80" r="20" fill="#10b981" />
                <text x="300" y="85" textAnchor="middle" className="fill-white text-xs">Director</text>
                
                <circle cx="50" cy="200" r="18" fill="#ef4444" />
                <text x="50" y="205" textAnchor="middle" className="fill-white text-xs">Shell Co</text>
                
                <circle cx="150" cy="250" r="15" fill="#dc2626" />
                <text x="150" y="255" textAnchor="middle" className="fill-white text-xs">Sanctioned</text>
              </svg>
              <div className="absolute top-4 right-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Risk Path Detected</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>High Risk Connection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Medium Risk</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Low Risk</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Overall Risk Score</span>
                <span className={`text-2xl font-bold ${riskScore > 70 ? 'text-red-600' : riskScore > 40 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {riskScore}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className={`h-3 rounded-full ${riskScore > 70 ? 'bg-red-500' : riskScore > 40 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                     style={{width: `${riskScore}%`}}></div>
              </div>
              
              <div className="space-y-3 mt-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">PEP Connection Detected</h4>
                    <p className="text-sm text-gray-600">Director has connections to politically exposed person</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Address Mismatch</h4>
                    <p className="text-sm text-gray-600">Registered address differs from operational address</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Document Verification Passed</h4>
                    <p className="text-sm text-gray-600">All submitted documents are authentic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blockchain Verification */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Blockchain Verification</span>
            </h3>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">Verification Complete</span>
                </div>
                <div className="text-sm space-y-1">
                  <div><strong>Transaction ID:</strong> 0x7f2a9b8c3d4e5f6g7h8i9j0k1l2m3n4o</div>
                  <div><strong>Block Height:</strong> 2,847,391</div>
                  <div><strong>Timestamp:</strong> {new Date().toLocaleString()}</div>
                  <div><strong>Validator:</strong> RBI-Node-Mumbai-01</div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Key className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-800">Quantum-Safe Signature</span>
                </div>
                <div className="text-sm">
                  <div><strong>Algorithm:</strong> CRYSTALS-Dilithium</div>
                  <div><strong>Status:</strong> <span className="text-green-600 font-medium">Valid ✓</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Explainable AI */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Explainable Decision</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">RBI Rule Triggered</h4>
                <p className="text-sm text-blue-700">Section 2(1)(g) - Enhanced Due Diligence required for PEP connections</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Decision Tree Path</h4>
                <div className="text-sm space-y-1 ml-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Document verification: PASS</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>PEP screening: ALERT</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Address validation: MISMATCH</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span><strong>Final Decision: MANUAL REVIEW</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const ContinuousKYCView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Continuous KYC Monitoring</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <div className="text-sm text-gray-600">Active Monitors</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Bell className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">23</div>
            <div className="text-sm text-gray-600">New Alerts</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">98.7%</div>
            <div className="text-sm text-gray-600">Compliance Rate</div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Recent Monitoring Alerts</h4>
          {[
            { company: "TechCorp Solutions", alert: "Sanction list update - Director added to watch list", severity: "high", time: "2 hours ago" },
            { company: "Green Energy India", alert: "Address change detected in MCA records", severity: "medium", time: "1 day ago" },
            { company: "Mumbai Trading Co", alert: "Negative news mention in financial media", severity: "medium", time: "3 days ago" }
          ].map((alert, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${alert.severity === 'high' ? 'bg-red-100' : 'bg-orange-100'}`}>
                  <AlertTriangle className={`h-5 w-5 ${alert.severity === 'high' ? 'text-red-600' : 'text-orange-600'}`} />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">{alert.company}</h5>
                  <p className="text-sm text-gray-600">{alert.alert}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.severity === 'high' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {alert.severity.toUpperCase()}
                </span>
                <div className="text-xs text-gray-500 mt-1">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ReportsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Reports & Analytics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
            <h4 className="font-semibold text-blue-800 mb-4">Monthly KYC Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-700">Total Applications</span>
                <span className="font-bold text-blue-800">2,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-700">Auto-Approved</span>
                <span className="font-bold text-blue-800">2,156 (75.7%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-700">Manual Review</span>
                <span className="font-bold text-blue-800">623 (21.9%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-700">Rejected</span>
                <span className="font-bold text-blue-800">68 (2.4%)</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download Report</span>
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
            <h4 className="font-semibold text-green-800 mb-4">Audit Trail</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-green-700">Blockchain Records</span>
                <span className="font-bold text-green-800">2,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-700">Verified Signatures</span>
                <span className="font-bold text-green-800">2,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-700">Integrity Score</span>
                <span className="font-bold text-green-800">100%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-700">Compliance Rating</span>
                <span className="font-bold text-green-800">AAA+</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Verify on Chain</span>
            </button>
          </div>
        </div>

        {/* Verifiable Credentials */}
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-purple-100 rounded-full">
                <Key className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Verifiable KYC Credentials</h4>
            <p className="text-gray-600 mb-4">Issue portable, privacy-preserving credentials that can be shared across institutions</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-medium text-purple-800">Basic KYC</h5>
                <p className="text-sm text-purple-600">Identity verified, documents authentic</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-medium text-purple-800">Enhanced DD</h5>
                <p className="text-sm text-purple-600">Risk assessment, beneficial ownership</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-medium text-purple-800">Continuous Monitor</h5>
                <p className="text-sm text-purple-600">Ongoing compliance, alert history</p>
              </div>
            </div>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Issue Credential
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* API Configuration */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Data Source Integration</span>
            </h4>
            <div className="space-y-3">
              {[
                { name: "Aadhaar eKYC", status: "Connected", color: "green" },
                { name: "CKYC Registry", status: "Connected", color: "green" },
                { name: "DigiLocker", status: "Connected", color: "green" },
                { name: "GSTN API", status: "Connected", color: "green" },
                { name: "MCA21", status: "Connected", color: "green" },
                { name: "SEBI Database", status: "Pending", color: "yellow" },
                { name: "RBI Watchlist", status: "Connected", color: "green" }
              ].map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">{source.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    source.color === 'green' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {source.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Blockchain Configuration */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Blockchain Network</span>
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-800">Hyperledger Fabric Network</h5>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Network Status</span>
                    <span className="font-medium text-blue-800">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Connected Peers</span>
                    <span className="font-medium text-blue-800">12/12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Last Block</span>
                    <span className="font-medium text-blue-800">#2,847,391</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-medium text-purple-800">Post-Quantum Security</h5>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-700">Encryption</span>
                    <span className="font-medium text-purple-800">CRYSTALS-Kyber</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Signatures</span>
                    <span className="font-medium text-purple-800">Dilithium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Key Rotation</span>
                    <span className="font-medium text-purple-800">90 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Rules Configuration */}
        <div className="mt-8">
          <h4 className="font-medium text-gray-900 mb-4">Risk Assessment Rules</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-800">PEP Screening Threshold</h5>
                  <p className="text-sm text-gray-600">Trigger manual review for PEP connections</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="range" min="0" max="100" defaultValue="25" className="w-20" />
                  <span className="text-sm font-medium">25%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-800">Document Mismatch Tolerance</h5>
                  <p className="text-sm text-gray-600">Auto-reject threshold for data mismatches</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="range" min="0" max="100" defaultValue="15" className="w-20" />
                  <span className="text-sm font-medium">15%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-800">Beneficial Ownership Depth</h5>
                  <p className="text-sm text-gray-600">Maximum relationship hops to trace</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="range" min="1" max="10" defaultValue="5" className="w-20" />
                  <span className="text-sm font-medium">5 hops</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">TrustGraph KYC</h1>
                  <p className="text-sm text-gray-500">Zero-friction compliance with AI + Blockchain</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-6 w-6 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Admin User</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'verification', label: 'KYC Verification', icon: FileText },
              { id: 'continuous', label: 'Continuous KYC', icon: Activity },
              { id: 'reports', label: 'Reports & Audit', icon: PieChart },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'verification' && <VerificationView />}
        {activeTab === 'continuous' && <ContinuousKYCView />}
        {activeTab === 'reports' && <ReportsView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Demo Action Bar */}
      {!processing && !verificationComplete && (
        <div className="fixed bottom-6 right-6">
          <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg">
            <h4 className="font-medium mb-2">Quick Demo</h4>
            <p className="text-sm text-blue-100 mb-3">Experience the full KYC pipeline</p>
            <button 
              onClick={() => {
                setActiveTab('verification');
                setTimeout(() => processCase(mockCases[0]), 500);
              }}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>Run Demo</span>
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-gray-900">TrustGraph KYC</span>
              </div>
              <p className="text-sm text-gray-600">
                India's first AI + Blockchain + Quantum-safe KYC platform for financial institutions.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• AI-powered document processing</li>
                <li>• Graph-based risk analytics</li>
                <li>• Blockchain audit trail</li>
                <li>• Quantum-safe encryption</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Compliance</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• RBI Guidelines</li>
                <li>• PMLA Compliance</li>
                <li>• SEBI Requirements</li>
                <li>• FATF Standards</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Integration</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• REST API</li>
                <li>• SDK Libraries</li>
                <li>• Webhook Events</li>
                <li>• Account Aggregator</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              © 2025 TrustGraph KYC. Built for India's financial ecosystem. 
              <span className="mx-2">•</span>
              Zero-friction onboarding with verifiable compliance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrustGraphKYC;
